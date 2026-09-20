import React, { useState, useEffect } from 'react';

function PropertySearch({ properties }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);
    setSelectedIndex(-1);

    const timer = setTimeout(() => {
      const filtered = properties.filter(
        item => 
          item.name.toLowerCase().includes(query.toLowerCase()) || 
          item.location.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, properties]);

  // Handle keyboard navigation (Arrow keys & Enter)
  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      setQuery(results[selectedIndex].name);
      setIsOpen(false);
    }
  };

  return (
    <div className="search-input-box">
      <span className="search-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input
        type="text"
        className="search-input"
        placeholder="Try searching 'Lekki', 'Duplex', or 'Ikoyi'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if(query) setIsOpen(true); }}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div className="dropdown-results">
          {isLoading ? (
            <div className="loading-state">
              <span className="spinner"></span>
              Searching verified listings...
            </div>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setQuery(item.name);
                  setIsOpen(false);
                }}
                className={`result-item ${index === selectedIndex ? 'selected-item' : ''}`}
                style={{
                  background: index === selectedIndex ? '#ecfdf5' : 'transparent'
                }}
              >
                <div className="result-header">
                  <span className="result-title">{item.name}</span>
                  <span className="result-badge">{item.type}</span>
                </div>
                <div className="result-footer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{item.location}</span>
                  <span className="result-price" style={{ marginLeft: 'auto' }}>{item.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              No matching properties found. Try another keyword.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PropertySearch;