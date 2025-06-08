import React, { useState, useEffect } from "react";

const skipImages = {
  4: "https://placehold.co/300x200?text=4+Yard+Skip",
  6: "https://placehold.co/300x200?text=6+Yard+Skip",
  8: "https://placehold.co/300x200?text=8+Yard+Skip",
  10: "https://placehold.co/300x200?text=10+Yard+Skip",
  12: "https://placehold.co/300x200?text=12+Yard+Skip",
  14: "https://placehold.co/300x200?text=14+Yard+Skip",
  16: "https://placehold.co/300x200?text=16+Yard+Skip",
  20: "https://placehold.co/300x200?text=20+Yard+Skip",
  40: "https://placehold.co/300x200?text=40+Yard+Skip",
};

const SkipSelector = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skip data");
        }
        const data = await response.json();
        setSkips(data);
        setLoading(false);
        console.log("Skip images mapping:", skipImages);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSkips();
  }, []);

  const handleSelectSkip = (skipId) => {
    setSelectedSkip(skipId);
  };

  const calculatePriceWithVat = (priceBeforeVat, vat) => {
    if (typeof priceBeforeVat !== "number" || typeof vat !== "number") {
      return null;
    }
    return priceBeforeVat * (1 + vat / 100);
  };

  const handleImageError = (e) => {
    console.error(`Failed to load image for skip ${e.target.alt}`);
    e.target.src = "https://placehold.co/300x200?text=Skip";
  };

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={errorStyle}>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        <i className="fas fa-truck" style={iconStyle}></i> Choose Your Skip Size
      </h2>
      <p style={subtitleStyle}>
        Select the skip size that best suits your needs
      </p>
      <div style={skipGridStyle}>
        {skips.map((skip) => {
          const priceWithVat = calculatePriceWithVat(
            skip.price_before_vat,
            skip.vat
          );
          return (
            <div key={skip.id} style={skipCardStyle}>
              <img
                src={
                  skipImages[skip.size] ||
                  "https://placehold.co/300x200?text=Skip"
                }
                alt={`${skip.size} Yard Skip`}
                style={imageStyle}
                onError={handleImageError}
              />
              <h3 style={skipTitleStyle}>
                <i className="fas fa-box-open" style={iconStyle}></i>{" "}
                {`${skip.size} Yard Skip`}
              </h3>
              <p style={descriptionStyle}>
                <i className="fas fa-calendar-alt" style={iconStyle}></i> Hire
                for {skip.hire_period_days} days.{" "}
                {skip.allowed_on_road ? (
                  <span>
                    <i className="fas fa-road" style={iconStyle}></i> Suitable
                    for on-road placement.{" "}
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-ban" style={iconStyle}></i> Not for
                    on-road use.{" "}
                  </span>
                )}
                {skip.allows_heavy_waste ? (
                  <span>
                    <i className="fas fa-weight-hanging" style={iconStyle}></i>{" "}
                    Handles heavy waste.
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-feather" style={iconStyle}></i> Not
                    suitable for heavy waste.
                  </span>
                )}
              </p>
              <p style={priceStyle}>
                <i className="fas fa-pound-sign" style={iconStyle}></i>{" "}
                {priceWithVat !== null
                  ? `£${priceWithVat.toFixed(2)}`
                  : "Price not available"}
              </p>
              <button
                style={{
                  ...buttonStyle,
                  ...(selectedSkip === skip.id ? selectedButtonStyle : {}),
                }}
                onClick={() => handleSelectSkip(skip.id)}
              >
                <i
                  className={
                    selectedSkip === skip.id
                      ? "fas fa-check-circle"
                      : "fas fa-hand-pointer"
                  }
                  style={iconStyle}
                ></i>{" "}
                {selectedSkip === skip.id ? "Selected" : "Select this Skip"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem 1rem",
  textAlign: "center",
  fontFamily: "'Arial', sans-serif",
};

const titleStyle = {
  fontSize: "clamp(1.5rem, 5vw, 1.75rem)",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
};

const subtitleStyle = {
  fontSize: "clamp(0.9rem, 3vw, 1rem)",
  color: "#4b5563",
  marginBottom: "1.5rem",
};

const skipGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1rem",
  padding: "0 0.5rem",
  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
  },
  "@media (min-width: 641px) and (max-width: 1024px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
};

const skipCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "1rem",
  textAlign: "center",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  position: "relative",
  overflow: "hidden",
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  "@media (max-width: 640px)": {
    padding: "0.75rem",
  },
};

const imageStyle = {
  width: "100%",
  height: "clamp(150px, 25vw, 180px)",
  objectFit: "cover",
  borderRadius: "6px",
  marginBottom: "0.75rem",
  display: "block",
};

const skipTitleStyle = {
  fontSize: "clamp(1.1rem, 3.5vw, 1.25rem)",
  fontWeight: "500",
  color: "#1f2937",
  marginBottom: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
};

const descriptionStyle = {
  fontSize: "clamp(0.8rem, 2.5vw, 0.875rem)",
  color: "#6b7280",
  marginBottom: "0.75rem",
  minHeight: "4rem",
  lineHeight: "1.5",
};

const priceStyle = {
  fontSize: "clamp(1rem, 3vw, 1.125rem)",
  fontWeight: "600",
  color: "#2563eb",
  marginBottom: "0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
  fontWeight: "500",
  color: "#ffffff",
  backgroundColor: "#2563eb",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  maxWidth: "200px",
  margin: "0 auto",
  ":hover": {
    backgroundColor: "#1e40af",
    transform: "scale(1.05)",
  },
  "@media (max-width: 640px)": {
    padding: "0.5rem",
  },
};

const selectedButtonStyle = {
  backgroundColor: "#1e40af",
  opacity: "0.9",
};

const iconStyle = {
  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
  color: "inherit",
};

const loadingStyle = {
  textAlign: "center",
  fontSize: "clamp(1rem, 3vw, 1.125rem)",
  color: "#4b5563",
  padding: "3rem",
};

const errorStyle = {
  textAlign: "center",
  fontSize: "clamp(1rem, 3vw, 1.125rem)",
  color: "#dc2626",
  padding: "3rem",
};

export default SkipSelector;
