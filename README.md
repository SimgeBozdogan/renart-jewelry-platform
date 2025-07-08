# 💎 Jewelry E-commerce Platform

**Full Stack React & Node.js Application**

Developed for Renart Full Stack Development Internship Case Study

## 🌐 Live Demo
**[https://jewelry-simge.surge.sh](https://jewelry-simge.surge.sh)**

## 🚀 Features

### Frontend (React.js)
- ⚡ **Modern UI/UX** - Clean, responsive design
- 📱 **Mobile-First** - Fully responsive across all devices  
- 🛒 **Product Catalog** - Interactive jewelry showcase
- 🔍 **Advanced Filtering** - Filter by price, popularity, rating
- 🎨 **Swiper Integration** - Smooth product carousel
- ⚙️ **Real-time Data** - Dynamic product loading

### Backend (Node.js/Express)
- 🔧 **RESTful API** - Clean API architecture
- 💰 **Live Gold Pricing** - Real-time gold price integration
- 📊 **Dynamic Pricing** - Calculated based on weight & popularity
- 🛡️ **Error Handling** - Robust fallback mechanisms
- 🌐 **CORS Enabled** - Cross-origin resource sharing
- ⚡ **Performance Optimized** - Cached responses & timeouts

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern component-based architecture
- **Axios** - HTTP client for API calls
- **Swiper.js** - Touch-enabled carousel
- **CSS3** - Custom styling with modern features
- **Responsive Design** - Mobile-first approach

### Backend  
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **node-fetch** - HTTP requests
- **CORS** - Cross-origin resource sharing
- **Real-time APIs** - Live gold price integration

### Deployment
- **Surge.sh** - Frontend hosting with CDN
- **Production Build** - Optimized React build
- **SSL/HTTPS** - Secure connection

## 📁 Project Structure

```
jewelry-app/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── config.js        # API configuration
│   │   └── App.js           # Main app component
│   ├── public/              # Static files
│   └── build/               # Production build
├── server.js                # Express backend
├── products.json           # Product data
└── package.json            # Dependencies
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd jewelry-app
```

2. **Install dependencies**
```bash
npm install
cd frontend && npm install
```

3. **Start the backend**
```bash
node server.js
# Server runs on http://localhost:5000
```

4. **Start the frontend**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products with filtering |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/gold-price` | Get current gold price |
| GET | `/api/health` | Health check |

### Query Parameters for Products
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter  
- `minPopularity` - Minimum popularity score
- `maxPopularity` - Maximum popularity score

## 🎯 Key Features Implemented

### Dynamic Pricing System
- Real-time gold price integration from external APIs
- Price calculation: `(popularity + 1) × weight × goldPrice`
- Fallback mechanisms for API failures

### Advanced Filtering
- Client-side and server-side filtering
- Real-time filter application
- Clear and apply filter functions

### Responsive Design
- Mobile-first approach
- Breakpoints for all screen sizes
- Touch-optimized interactions

### Performance Optimization
- API response caching
- Timeout handling for external APIs
- Optimized build for production

## 🌟 Technical Highlights

- **Clean Code Architecture** - Modular, maintainable codebase
- **Error Handling** - Comprehensive error management
- **API Integration** - Multiple external API integrations
- **Real-time Data** - Live pricing and dynamic content
- **Production Ready** - Optimized build and deployment

## 👩‍💻 Developer

**Simge Bozdoğan**
- Email: simge.bzdgn@gmail.com
- Project: Renart Full Stack Development Internship Case Study

## 📝 License

This project was developed as a case study for Renart Full Stack Development Internship position.

---

**Developed with ❤️ for Renart** 