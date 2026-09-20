import React from 'react';
import PropertySearch from './components/PropertySearch';
import propertiesData from './data/properties';
import './App.css';

function App() {
  return (
    <div className="search-container">
      <h1 className="portal-title">
        Expert Listing Property Search
      </h1>
      <p className="portal-subtitle">
        Type a location, property type, or keyword to find verified listings.
      </p>

      <PropertySearch properties={propertiesData} />
    </div>
  );
}

export default App;