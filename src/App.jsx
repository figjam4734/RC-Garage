import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const STATUS_STYLES = {
  "Active Build": { bg: "#D97F4C", fg: "#1C1B19" },
  "Daily Driver": { bg: "#5C7A5C", fg: "#1C1B19" },
  "Research": { bg: "#6E7B8B", fg: "#1C1B19" },
};
const STATUS_OPTIONS = Object.keys(STATUS_STYLES);

const ADMIN_PASSWORD = "rcgarage2026";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap";

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
          {vehicle.summary && (
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
          )}

          {(vehicle.sections || []).map((section, si) => (
            <div key={si} style={{ marginBottom: "1.25rem" }}>
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
              {(section.items || []).map((item, i) => (
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

          {vehicle.log && vehicle.log.length > 0 && (
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
          )}
        </div>
      )}
    </div>
  );
}

function PageShell({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1C1B19",
        padding: "2rem 1rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>{children}</div>
    </div>
  );
}

function Header({ count, isAdmin, onNav }) {
  return (
    <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
      <div>
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
          Build Sheet - {count} Vehicles
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
          Tap a vehicle to open its build sheet - components, specs, and progress notes.
        </p>
      </div>
      <button
        onClick={onNav}
        style={{
          background: "none",
          border: "1px solid #3A372F",
          color: "#8A8377",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.5rem 0.75rem",
          borderRadius: "2px",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        {isAdmin ? "View Garage" : "Edit"}
      </button>
    </div>
  );
}

function GarageView({ vehicles, loading, onNav, isAdmin }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <PageShell>
      <Header count={vehicles.length} isAdmin={isAdmin} onNav={onNav} />
      {loading && <p style={{ color: "#8A8377" }}>Loading...</p>}
      {!loading && vehicles.length === 0 && (
        <p style={{ color: "#8A8377" }}>No vehicles yet. Tap "Edit" to add one.</p>
      )}
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          expanded={expandedId === vehicle.id}
          onToggle={() => setExpandedId(expandedId === vehicle.id ? null : vehicle.id)}
        />
      ))}
    </PageShell>
  );
}

function AdminLogin({ onLogin, onNav }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect password");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#1C1B19",
    border: "1px solid #3A372F",
    borderRadius: "4px",
    color: "#EDE6DA",
    padding: "0.6rem 0.75rem",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9rem",
    boxSizing: "border-box",
  };

  return (
    <PageShell>
      <Header count={0} isAdmin={true} onNav={onNav} />
      <form onSubmit={submit} style={{ maxWidth: "320px" }}>
        <label style={{ display: "block", color: "#8A8377", fontSize: "0.8rem", marginBottom: "0.5rem", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Admin Password
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={inputStyle}
          autoFocus
        />
        {error && <p style={{ color: "#D97F4C", fontSize: "0.8rem", marginTop: "0.5rem" }}>{error}</p>}
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            background: "#D97F4C",
            color: "#1C1B19",
            border: "none",
            borderRadius: "4px",
            padding: "0.6rem 1.25rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
        >
          Unlock
        </button>
      </form>
    </PageShell>
  );
}

const blankVehicle = () => ({
  id: "",
  name: "",
  subtitle: "",
  status: "Research",
  summary: "",
  sections: [],
  log: [],
  sort_order: 999,
});

const inputStyle = {
  width: "100%",
  background: "#1C1B19",
  border: "1px solid #3A372F",
  borderRadius: "4px",
  color: "#EDE6DA",
  padding: "0.5rem 0.65rem",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.85rem",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  color: "#8A8377",
  fontSize: "0.7rem",
  marginBottom: "0.3rem",
  fontFamily: "'JetBrains Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const btnStyle = {
  background: "none",
  border: "1px solid #3A372F",
  color: "#C7C0B3",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.7rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  padding: "0.4rem 0.7rem",
  borderRadius: "2px",
  cursor: "pointer",
};

const primaryBtnStyle = {
  ...btnStyle,
  background: "#D97F4C",
  color: "#1C1B19",
  border: "none",
  fontWeight: 700,
};

const dangerBtnStyle = {
  ...btnStyle,
  color: "#D97F4C",
};

function VehicleEditor({ vehicle, onChange, onDelete, onSave, saving }) {
  const update = (field, value) => onChange({ ...vehicle, [field]: value });

  const updateSection = (si, field, value) => {
    const sections = [...vehicle.sections];
    sections[si] = { ...sections[si], [field]: value };
    update("sections", sections);
  };

  const updateItem = (si, ii, field, value) => {
    const sections = [...vehicle.sections];
    const items = [...sections[si].items];
    items[ii] = { ...items[ii], [field]: value };
    sections[si] = { ...sections[si], items };
    update("sections", sections);
  };

  const addSection = () => {
    update("sections", [...(vehicle.sections || []), { title: "New Section", items: [] }]);
  };

  const removeSection = (si) => {
    update("sections", vehicle.sections.filter((_, i) => i !== si));
  };

  const addItem = (si) => {
    const sections = [...vehicle.sections];
    sections[si] = { ...sections[si], items: [...(sections[si].items || []), { part: "", notes: "" }] };
    update("sections", sections);
  };

  const removeItem = (si, ii) => {
    const sections = [...vehicle.sections];
    sections[si] = { ...sections[si], items: sections[si].items.filter((_, i) => i !== ii) };
    update("sections", sections);
  };

  const updateLog = (i, value) => {
    const log = [...(vehicle.log || [])];
    log[i] = value;
    update("log", log);
  };

  const addLog = () => update("log", [...(vehicle.log || []), ""]);
  const removeLog = (i) => update("log", vehicle.log.filter((_, idx) => idx !== i));

  return (
    <div
      style={{
        background: "#26241F",
        border: "1px solid #3A372F",
        borderRadius: "4px",
        marginBottom: "1rem",
        padding: "1.25rem 1.5rem",
      }}
    >
      <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "1fr", marginBottom: "1rem" }}>
        <div>
          <label style={labelStyle}>Vehicle Name</label>
          <input style={inputStyle} value={vehicle.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Vanquish VS4-10 4WS" />
        </div>
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input style={inputStyle} value={vehicle.subtitle || ""} onChange={(e) => update("subtitle", e.target.value)} placeholder="e.g. Twin-steer crawler chassis" />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select style={inputStyle} value={vehicle.status} onChange={(e) => update("status", e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Summary</label>
          <textarea style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} value={vehicle.summary || ""} onChange={(e) => update("summary", e.target.value)} placeholder="One or two sentence overview of the build" />
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ ...labelStyle, marginBottom: "0.5rem" }}>Component Sections</div>
        {(vehicle.sections || []).map((section, si) => (
          <div key={si} style={{ border: "1px dashed #3A372F", borderRadius: "4px", padding: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", fontSize: "0.7rem" }}
                value={section.title}
                onChange={(e) => updateSection(si, "title", e.target.value)}
                placeholder="Section title e.g. Axles & Drivetrain"
              />
              <button style={dangerBtnStyle} onClick={() => removeSection(si)}>Remove</button>
            </div>
            {(section.items || []).map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", alignItems: "center" }}>
                <input style={inputStyle} value={item.part} onChange={(e) => updateItem(si, ii, "part", e.target.value)} placeholder="Part name" />
                <input style={inputStyle} value={item.notes} onChange={(e) => updateItem(si, ii, "notes", e.target.value)} placeholder="Notes" />
                <button style={dangerBtnStyle} onClick={() => removeItem(si, ii)}>x</button>
              </div>
            ))}
            <button style={btnStyle} onClick={() => addItem(si)}>+ Add Part</button>
          </div>
        ))}
        <button style={btnStyle} onClick={addSection}>+ Add Section</button>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ ...labelStyle, marginBottom: "0.5rem" }}>Build Log</div>
        {(vehicle.log || []).map((entry, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <input style={inputStyle} value={entry} onChange={(e) => updateLog(i, e.target.value)} placeholder="Log entry" />
            <button style={dangerBtnStyle} onClick={() => removeLog(i)}>x</button>
          </div>
        ))}
        <button style={btnStyle} onClick={addLog}>+ Add Log Entry</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={dangerBtnStyle} onClick={onDelete}>Delete Vehicle</button>
        <button style={primaryBtnStyle} onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

function AdminEditor({ vehicles, setVehicles, onNav }) {
  const [savingIdx, setSavingIdx] = useState(null);
  const [message, setMessage] = useState("");

  const updateVehicle = (idx, updated) => {
    setVehicles(vehicles.map((v, i) => (i === idx ? updated : v)));
  };

  const saveVehicle = async (idx) => {
    const vehicle = vehicles[idx];
    setSavingIdx(idx);
    setMessage("");
    let idToUse = vehicle.id;
    if (!idToUse) {
      idToUse = (vehicle.name || "vehicle")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);
    }
    const payload = { ...vehicle, id: idToUse };
    const { error } = await supabase.from("vehicles").upsert(payload);
    setSavingIdx(null);
    if (error) {
      setMessage("Error saving: " + error.message);
    } else {
      setMessage("Saved.");
      setVehicles(vehicles.map((v, i) => (i === idx ? payload : v)));
    }
  };

  const deleteVehicle = async (idx) => {
    const vehicle = vehicles[idx];
    if (!window.confirm(`Delete ${vehicle.name || "this vehicle"}?`)) return;
    if (vehicle.id) {
      const { error } = await supabase.from("vehicles").delete().eq("id", vehicle.id);
      if (error) {
        setMessage("Error deleting: " + error.message);
        return;
      }
    }
    setVehicles(vehicles.filter((_, i) => i !== idx));
    setMessage("Deleted.");
  };

  const addVehicle = () => {
    setVehicles([...vehicles, blankVehicle()]);
  };

  return (
    <PageShell>
      <Header count={vehicles.length} isAdmin={true} onNav={onNav} />
      {message && (
        <p style={{ color: "#D97F4C", fontSize: "0.85rem", marginBottom: "1rem", fontFamily: "'JetBrains Mono', monospace" }}>
          {message}
        </p>
      )}
      {vehicles.map((vehicle, idx) => (
        <VehicleEditor
          key={vehicle.id || `new-${idx}`}
          vehicle={vehicle}
          onChange={(v) => updateVehicle(idx, v)}
          onDelete={() => deleteVehicle(idx)}
          onSave={() => saveVehicle(idx)}
          saving={savingIdx === idx}
        />
      ))}
      <button style={primaryBtnStyle} onClick={addVehicle}>+ Add Vehicle</button>
    </PageShell>
  );
}

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("garage");
  const [authed, setAuthed] = useState(false);

  const fetchVehicles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setVehicles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleNav = () => {
    if (view === "garage") {
      setView(authed ? "admin" : "login");
    } else {
      setView("garage");
      fetchVehicles();
    }
  };

  if (view === "login") {
    return (
      <AdminLogin
        onLogin={() => {
          setAuthed(true);
          setView("admin");
        }}
        onNav={() => setView("garage")}
      />
    );
  }

  if (view === "admin") {
    return <AdminEditor vehicles={vehicles} setVehicles={setVehicles} onNav={handleNav} />;
  }

  return <GarageView vehicles={vehicles} loading={loading} onNav={handleNav} isAdmin={false} />;
}
