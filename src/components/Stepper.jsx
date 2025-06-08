import React from "react";

const steps = [
  { name: "Postcode", icon: "fas fa-map-pin" },
  { name: "Waste Type", icon: "fas fa-trash" },
  { name: "Select Skip", icon: "fas fa-truck" },
  { name: "Permit Type", icon: "fas fa-file-contract" },
  { name: "Choose Date", icon: "fas fa-calendar-alt" },
  { name: "Payment", icon: "fas fa-credit-card" },
];

const Stepper = ({ currentStep = 2 }) => {
  // Debug icon loading
  React.useEffect(() => {
    if (!window.FontAwesome) {
      console.warn(
        "Font Awesome not loaded. Ensure the CDN is included in your HTML."
      );
    }
    steps.forEach((step, index) => {
      console.log(`Step ${index + 1}: ${step.name} with icon ${step.icon}`);
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={stepperStyle}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} style={stepContainerStyle}>
              {/* Circle with Icon or Fallback Number */}
              <div
                style={{
                  ...circleStyle,
                  backgroundColor:
                    isCompleted || isActive ? "#2563eb" : "#d1d5db",
                  color: isCompleted || isActive ? "#ffffff" : "#4b5563",
                }}
              >
                <i className={step.icon} style={iconStyle}></i>
                {/* Fallback number if icon fails */}
                <span style={fallbackNumberStyle}>{index + 1}</span>
              </div>

              {/* Label */}
              <div
                style={{
                  ...labelStyle,
                  color: isCompleted || isActive ? "#1e40af" : "#6b7280",
                }}
              >
                {step.name}
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    ...lineStyle,
                    backgroundColor:
                      index < currentStep - 1 ? "#2563eb" : "#d1d5db",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const containerStyle = {
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
  padding: "clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem)",
};

const stepperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  flexWrap: "wrap",
  gap: "0.5rem",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "center",
  },
};

const stepContainerStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  flex: "1",
  "@media (max-width: 640px)": {
    flex: "none",
    width: "100%",
    justifyContent: "center",
    marginBottom: "1rem",
  },
};

const circleStyle = {
  width: "clamp(2rem, 6vw, 2.5rem)",
  height: "clamp(2rem, 6vw, 2.5rem)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
  fontWeight: "bold",
  transition: "background-color 0.3s ease, color 0.3s ease",
  zIndex: 1,
  position: "relative",
};

const iconStyle = {
  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
  color: "inherit",
};

const fallbackNumberStyle = {
  position: "absolute",
  fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
  opacity: 0.5,
  color: "inherit",
};

const labelStyle = {
  position: "absolute",
  top: "clamp(2.5rem, 7vw, 3rem)",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
  textAlign: "center",
  width: "clamp(60px, 15vw, 80px)",
  color: "#6b7280",
  transition: "color 0.3s ease",
  "@media (max-width: 640px)": {
    position: "static",
    transform: "none",
    marginTop: "0.5rem",
    width: "auto",
  },
};

const lineStyle = {
  flexGrow: 1,
  height: "clamp(0.2rem, 1vw, 0.25rem)",
  margin: "0 clamp(0.5rem, 1.5vw, 0.75rem)",
  transition: "background-color 0.3s ease",
  "@media (max-width: 640px)": {
    display: "none",
  },
};

export default Stepper;
