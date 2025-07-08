import React from 'react';
import './ColorPicker.css';

const ColorPicker = ({ colors, selectedColor, onColorChange, showColorName = false }) => {
  const colorNames = {
    yellow: 'Yellow Gold',
    rose: 'Rose Gold',
    white: 'White Gold'
  };

  const colorStyles = {
    yellow: '#FECA97',
    rose: '#E8B4B8', 
    white: '#D9D9D9'
  };

  return (
    <div className="color-picker">
      {Object.keys(colors).map((colorKey) => (
        <button
          key={colorKey}
          className={`color-option ${selectedColor === colorKey ? 'active' : ''}`}
          onClick={() => onColorChange(colorKey)}
          title={colorNames[colorKey]}
        >
          <div 
            className="color-circle"
            style={{ backgroundColor: colorStyles[colorKey] }}
          />
          {selectedColor === colorKey && (
            <div className="check-mark">
              <i className="fas fa-check"></i>
            </div>
          )}
        </button>
      ))}
      
      {showColorName && (
        <div className="color-name">
          {colorNames[selectedColor]}
        </div>
      )}
    </div>
  );
};

export default ColorPicker; 