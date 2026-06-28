import React, { useState, useEffect } from "react";
import type { GalleryItem } from "../data";
import { 
  Zap, Settings, Cpu, ShieldCheck, Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2, Eye
} from "lucide-react";

interface FieldGalleryProps {
  items: GalleryItem[];
}

export const FieldGallery: React.FC<FieldGalleryProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Control Panels",
    "Distribution Boards",
    "Hospitality Maintenance",
    "Safety & Audits"
  ];

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Control Panels":
        return <Cpu size={14} />;
      case "Distribution Boards":
        return <Zap size={14} />;
      case "Hospitality Maintenance":
        return <Settings size={14} />;
      case "Safety & Audits":
        return <ShieldCheck size={14} />;
      default:
        return <Zap size={14} />;
    }
  };

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && activeLightboxIndex !== null) {
        setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
      }
      if (e.key === "ArrowRight" && activeLightboxIndex !== null) {
        setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const currentItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="badge">On-Site Visuals</span>
          <h2 className="section-title">Field Work & Equipment <span>Gallery</span></h2>
          <p className="section-desc">
            Authentic photographic documentation of medium/low voltage installations, control wiring, and safety auditing procedures.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filters" style={{ marginBottom: "2.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveLightboxIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-zoom-badge">
                    <Maximize2 size={16} />
                    <span>Inspect Photo</span>
                  </div>
                </div>
                <div className="gallery-category-tag">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </div>
              </div>

              <div className="gallery-content">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-desc">{item.description}</p>
                <div className="gallery-specs">
                  {item.specs.map((spec, sIdx) => (
                    <span key={sIdx} className="gallery-spec-pill">
                      <CheckCircle2 size={12} />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {currentItem && (
          <div className="lightbox-backdrop" onClick={closeLightbox}>
            <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close modal">
                <X size={22} />
              </button>

              {filteredItems.length > 1 && (
                <>
                  <button className="lightbox-nav-btn prev" onClick={prevImage} aria-label="Previous image">
                    <ChevronLeft size={24} />
                  </button>
                  <button className="lightbox-nav-btn next" onClick={nextImage} aria-label="Next image">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="lightbox-body">
                <div className="lightbox-media">
                  <img src={currentItem.imageUrl} alt={currentItem.title} className="lightbox-image" />
                  <div className="lightbox-counter">
                    <Eye size={14} />
                    <span>{activeLightboxIndex! + 1} / {filteredItems.length}</span>
                  </div>
                </div>

                <div className="lightbox-info">
                  <div className="gallery-category-tag modal-tag">
                    {getCategoryIcon(currentItem.category)}
                    <span>{currentItem.category}</span>
                  </div>
                  <h3 className="lightbox-title">{currentItem.title}</h3>
                  <p className="lightbox-desc">{currentItem.description}</p>
                  
                  <div className="lightbox-specs-section">
                    <h4 className="lightbox-specs-heading">Technical Specifications & Highlights</h4>
                    <div className="lightbox-specs-grid">
                      {currentItem.specs.map((spec, i) => (
                        <div key={i} className="lightbox-spec-item">
                          <CheckCircle2 size={15} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
