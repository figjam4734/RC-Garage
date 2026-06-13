import React, { useState } from "react";

const STATUS_STYLES = {
  "Active Build": { bg: "#D97F4C", fg: "#1C1B19" },
  "Daily Driver": { bg: "#5C7A5C", fg: "#1C1B19" },
  "Research": { bg: "#6E7B8B", fg: "#1C1B19" },
};

const initialVehicles = [
  {
    id: "vs4-10",
    name: "Vanquish VS4-10 4WS",
    subtitle: "Twin-steer crawler chassis",
    status: "Active Build",
    summary:
      "F10 straight axles front and rear, VFD Twin transmission, 4-link suspension with no panhard bar.",
    sections: [
      {
        title: "Axles & Drivetrain",
        items: [
          { part: "Vanquish F10 Straight Axle", notes: "Front & rear, both portal-free straight axles" },
          { part: "Rear Lunchbox Locker", notes: "Identified as cause of slip under steering angle — open diff recommended" },
          { part: "VFD Twin Transmission", notes: "Built-in dig function; servo linkage clearance issue with bellcrank" },
        ],
      },
      {
        title: "Suspension",
        items: [
          { part: "4-Link Suspension (no panhard)", notes: "Chassis centering via rod end length adjustment for lateral position" },
        ],
      },
      {
        title: "Steering",
        items: [
          { part: "4WS (4-Wheel Steer)", notes: "F10 axles, twin-steer geometry" },
        ],
      },
    ],
    log: [
      "Diagnosed rear slip under steering angle to lunchbox locker — open diff swap planned.",
      "Working out 4-link lateral centering via rod end adjustments.",
      "Investigating bellcrank reroute for VFD Twin servo linkage clearance.",
    ],
  },
  {
    id: "h10-optic",
    name: "H10 Optic",
    subtitle: "SCX10 portal conversion build",
    status: "Active Build",
    summary:
      "Adapting SCX10 portal axles to the H10 chassis with chassis-mounted steering (CMS).",
    sections: [
      {
        title: "Axles & Drivetrain",
        items: [
          { part: "SCX10 Portal Axles", notes: "Front & rear, adapted to H10 chassis" },
        ],
      },
      {
        title: "Steering",
        items: [
          { part: "Chassis-Mounted Steering (CMS)", notes: "Resolves axle-mounted servo conflict with portal axle geometry" },
          { part: "Vanquish F10 Portals (alternative)", notes: "Flagged as preferred native-fit axle option for 4WS" },
        ],
      },
    ],
    log: [
      "Axle-mounted servo conflicts with portal geometry — moving to CMS.",
      "Considering F10 Portals as a cleaner native-fit 4WS option down the line.",
    ],
  },
  {
    id: "trx4-ht",
    name: "TRX-4 High Trail",
    subtitle: "All-around crawler upgrade",
    status: "Daily Driver",
    summary:
      "Targeting all-around crawling capability with portal/diff cover upgrades, stronger steering, and better tires.",
    sections: [
      {
        title: "Drivetrain & Hardware",
        items: [
          { part: "Brass Portal Covers", notes: "Added weight/durability over stock plastic" },
          { part: "Brass Diff Covers", notes: "Front & rear" },
          { part: "Hot Racing Transmission Dig Kit", notes: "Next planned upgrade" },
        ],
      },
      {
        title: "Electronics",
        items: [
          { part: "40kg Steering Servo", notes: "Upgraded from stock for high-trail steering loads" },
          { part: "Hobbywing Fusion Pro", notes: "ESC/motor combo" },
        ],
      },
      {
        title: "Tires",
        items: [
          { part: "Pro-Line Baja Claws 2.2\"", notes: "All-around crawling tread" },
        ],
      },
    ],
    log: [
      "Brass portal/diff covers, 40kg servo, Fusion Pro, and Baja Claws installed.",
      "Hot Racing dig kit identified as next upgrade.",
    ],
  },
  {
    id: "scx10-coyote",
    name: "SCX10 III Coyote",
    subtitle: "LCG dig conversion research",
    status: "Research",
    summary:
      "Researching LCG (low center of gravity) dig conversion options for the stock SCX10 III chassis.",
    sections: [
      {
        title: "Transmission / LCG",
        items: [
          { part: "Axial LCXU Dig Conversion Kit (AXI238001)", notes: "Correct-fit solution for SCX10 III rail spacing" },
          { part: "D1RC LCG Unit", notes: "Incompatible — 78mm chassis rails vs D1RC's 72mm spacing" },
        ],
      },
    ],
    log: [
      "Confirmed D1RC unit won't fit (72mm vs 78mm rail spacing).",
      "AXI238001 (Axial LCXU kit) identified as correct conversion path.",
    ],
  },
];

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Research;
  return (
    <span
      style={{
        background: style.bg,
        color: style.fg,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.25rem 0.6rem",
        borderRadius: "2px",
      }}
    >
      {status}
    </span>
  );
}

function VehicleCard({ vehicle, expanded, onToggle }) {
  return (
    <div
      style={{
        background: "#26241F",
        border: "1px solid #3A372F",
        borderRadius: "4px",
        marginBottom: "1rem",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "1.25rem 1.5rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "#EDE6DA",
                textTransform: "uppercase",
              }}
            >
              {vehicle.name}
            </span>
            <StatusBadge status={vehicle.status} />
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#8A8377" }}>
            {vehicle.subtitle}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#D97F4C",
            fontSize: "1.2rem",
            flexShrink: 0,
            transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          +
        </span>
      </button>

      {expanded && (
        <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "#C7C0B3",
              lineHeight: 1.6,
              marginTop: 0,
              marginBottom: "1.25rem",
              borderLeft: "2px solid #D97F4C",
              paddingLeft: "0.85rem",
            }}
          >
            {vehicle.summary}
          </p>

          {vehicle.sections.map((section) => (
            <div key={section.title} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8A8377",
                  marginBottom: "0.5rem",
                  borderBottom: "1px solid #3A372F",
                  paddingBottom: "0.35rem",
                }}
              >
                {section.title}
              </div>
              {section.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0.15rem",
                    padding: "0.5rem 0",
                    borderBottom: i < section.items.length - 1 ? "1px dashed #3A372F" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#EDE6DA",
                    }}
                  >
                    {item.part}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: "#8A8377",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.notes}
                  </span>
                </div>
              ))}
            </div>
          ))}

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8A8377",
                marginBottom: "0.5rem",
                borderBottom: "1px solid #3A372F",
                paddingBottom: "0.35rem",
              }}
            >
              Build Log
            </div>
            {vehicle.log.map((entry, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  padding: "0.35rem 0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "#C7C0B3",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "#D97F4C", fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{entry}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RCGarage() {
  const [expandedId, setExpandedId] = useState("vs4-10");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1C1B19",
        padding: "2rem 1rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#D97F4C",
              marginBottom: "0.5rem",
            }}
          >
            Build Sheet — {initialVehicles.length} Vehicles
          </div>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "2.25rem",
              fontWeight: 700,
              color: "#EDE6DA",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            RC Garage Ledger
          </h1>
          <p style={{ color: "#8A8377", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Tap a vehicle to open its build sheet — components, specs, and progress notes.
          </p>
        </div>

        {initialVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            expanded={expandedId === vehicle.id}
            onToggle={() => setExpandedId(expandedId === vehicle.id ? null : vehicle.id)}
          />
        ))}
      </div>
    </div>
  );
}

