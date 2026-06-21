import { marqueeItems } from "@/lib/data"

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div
      style={{
        borderTop: "1px solid #1e1e2e",
        borderBottom: "1px solid #1e1e2e",
        background: "#0D0D14",
        overflow: "hidden",
        padding: "0.85rem 0",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingRight: "1.5rem",
              color: "#6b6f7e",
              fontFamily: "monospace",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ color: "#7FFFD4" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
