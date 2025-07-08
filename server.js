const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let goldPrice = 65.0;
let lastUpdate = 0;

async function getGoldPrice() {
  try {
    const now = Date.now();
    if (now - lastUpdate < 5 * 60 * 1000) {
      return goldPrice;
    }

    // Timeout ekleyerek hızlı fail
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 saniye timeout

    const response = await fetch('https://api.metals.live/v1/spot/gold', {
      signal: controller.signal,
      timeout: 3000
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    if (data && data.price) {
      goldPrice = data.price / 31.1035;
      lastUpdate = now;
      console.log(`Gold price updated: $${goldPrice.toFixed(2)}/gram`);
      return goldPrice;
    }
  } catch (error) {
    console.log('Primary API failed, trying fallback...');
    try {
      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), 3000);
      
      const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=XAU', {
        signal: controller2.signal,
        timeout: 3000
      });
      clearTimeout(timeoutId2);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      if (data?.data?.rates?.USD) {
        goldPrice = parseFloat(data.data.rates.USD) / 31.1035;
        lastUpdate = now;
        console.log(`Gold price updated (fallback): $${goldPrice.toFixed(2)}/gram`);
        return goldPrice;
      }
    } catch (e) {
      console.log('All APIs failed, using cached gold price:', goldPrice);
    }
  }
  
  return goldPrice;
}

function calculatePrice(popularity, weight, goldPrice) {
  return (popularity + 1) * weight * goldPrice;
}

async function loadProducts() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'products.json'), 'utf8');
    const products = JSON.parse(data);
    const currentGoldPrice = await getGoldPrice();
    
    return products.map((product, index) => ({
      id: index + 1,
      name: product.name,
      popularityScore: product.popularityScore,
      weight: product.weight,
      images: product.images,
      price: calculatePrice(product.popularityScore, product.weight, currentGoldPrice),
      rating: (product.popularityScore * 5).toFixed(1)
    }));
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

app.get('/api/products', async (req, res) => {
  try {
    const products = await loadProducts();
    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
    
    let filtered = products;
    
    if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    if (minPopularity) filtered = filtered.filter(p => p.popularityScore >= parseFloat(minPopularity));
    if (maxPopularity) filtered = filtered.filter(p => p.popularityScore <= parseFloat(maxPopularity));
    
    res.json({
      success: true,
      data: filtered,
      goldPrice: goldPrice,
      count: filtered.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await loadProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

app.get('/api/gold-price', async (req, res) => {
  try {
    const price = await getGoldPrice();
    res.json({
      success: true,
      data: {
        pricePerGram: price,
        currency: 'USD',
        lastUpdated: new Date(lastUpdate).toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gold price'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  getGoldPrice();
}); 