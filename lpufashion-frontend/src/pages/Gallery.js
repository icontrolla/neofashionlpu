import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../style/Gallery.css';

function Gallery() {
  const [showSplash, setShowSplash] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [modalData, setModalData] = useState(null);

  const subcategories = {
    'Avant-Garde': [
      { type: 'experimental-silhouettes', label: 'Experimental Silhouettes' },
      { type: 'futuristic-couture', label: 'Futuristic Couture' },
      { type: 'abstract-fusion', label: 'Abstract Fusion' },
    ],
    'Streetwear': [
      { type: 'urban-casual', label: 'Urban Casual' },
      { type: 'graffiti-inspired', label: 'Graffiti-Inspired' },
      { type: 'skate-culture', label: 'Skate Culture' },
    ],
    'Couture': [
      { type: 'runway-elegance', label: 'Runway Elegance' },
      { type: 'opulent-craftsmanship', label: 'Opulent Craftsmanship' },
      { type: 'timeless-luxury', label: 'Timeless Luxury' },
    ],
    'Sustainable': [
      { type: 'eco-friendly-designs', label: 'Eco-Friendly Designs' },
      { type: 'recycled-materials', label: 'Recycled Materials' },
      { type: 'green-couture', label: 'Green Couture' },
    ],
    'Bohemian': [
      { type: 'free-spirited-flow', label: 'Free-Spirited Flow' },
      { type: 'desert-vibes', label: 'Desert Vibes' },
      { type: 'gypsy-aesthetic', label: 'Gypsy Aesthetic' },
    ],
    'Minimalist': [
      { type: 'clean-lines', label: 'Clean Lines' },
      { type: 'monochrome-elegance', label: 'Monochrome Elegance' },
      { type: 'pure-simplicity', label: 'Pure Simplicity' },
    ],
    'Vintage': [
      { type: 'retro-revival', label: 'Retro Revival' },
      { type: 'classic-flair', label: 'Classic Flair' },
      { type: 'old-hollywood-glam', label: 'Old Hollywood Glam' },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/fashion-gallery/');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        const data = await response.json();
        const enrichedData = data.map((category) => ({
          ...category,
          subcategories: subcategories[category.name] || [],
        }));
        setCategories(enrichedData);
        const initialFilters = {};
        enrichedData.forEach((category) => {
          initialFilters[category.name] = 'all';
        });
        setSelectedSubcategories(initialFilters);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubcategoryChange = (categoryName, subcategoryType) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [categoryName]: subcategoryType,
    }));
  };

  const openModal = (item) => {
    setModalData(item);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="gallery-container">
      {/* Header */}
      <header className="header">
        <a href="/" className="header-logo">LPU Fashion</a>
        <nav className="header-nav">
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Splash Screen */}
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="splash-screen"
        >
          <motion.div className="bubble">
            <h1>NEO LPU Fashion</h1>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="gallery-content"
      >
        <h1>The Fashion Gallery</h1>
        <p>Curated works, student creativity, and runway moments.</p>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="gallery-sections">
            {categories.map((category) => (
              <motion.section key={category.name} variants={sectionVariants} className="category-section">
                <h2>{category.name}</h2>
                <select
                  className="filter-dropdown"
                  value={selectedSubcategories[category.name] || 'all'}
                  onChange={(e) => handleSubcategoryChange(category.name, e.target.value)}
                  aria-label={`Filter ${category.name} subcategories`}
                >
                  <option value="all">All</option>
                  {category.subcategories.map((sub) => (
                    <option key={sub.type} value={sub.type}>
                      {sub.label}
                    </option>
                  ))}
                </select>
                <div className="subcategory-container" id={category.name.toLowerCase().replace(/\s+/g, '-')}>
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.type}
                      className={`subcategory ${
                        selectedSubcategories[category.name] === sub.type ? 'active' : ''
                      }`}
                      data-type={sub.type}
                      onClick={() => handleSubcategoryChange(category.name, sub.type)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubcategoryChange(category.name, sub.type)}
                      aria-label={`Select ${sub.label}`}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
                <div className="artwork-gallery">
                  {category.items
                    .filter(
                      (item) =>
                        selectedSubcategories[category.name] === 'all' ||
                        item.subcategory === selectedSubcategories[category.name]
                    )
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        variants={cardVariants}
                        className="design-card"
                        onClick={() => openModal(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
                        aria-label={`View ${item.title} details`}
                      >
                        <img src={`http://localhost:8000${item.image}`} alt={item.title} />
                        <div className="content">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Modal */}
      {modalData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              ×
            </button>
            <img src={`http://localhost:8000${modalData.image}`} alt={modalData.title} />
            <h3>{modalData.title}</h3>
            <p>{modalData.description}</p>
            <p><strong>Category:</strong> {categories.find(cat => cat.items.some(item => item.id === modalData.id)).name}</p>
            <p><strong>Price:</strong> {modalData.price_eth} ETH</p>
            <p><strong>Minted:</strong> {modalData.is_minted ? 'Yes' : 'No'}</p>
            {modalData.is_minted && (
              <>
                <p><strong>Mint Address:</strong> {modalData.mint_address || 'N/A'}</p>
                <p><strong>Token ID:</strong> {modalData.token_id || 'N/A'}</p>
              </>
            )}
            <p><strong>Uploaded:</strong> {new Date(modalData.uploaded_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;