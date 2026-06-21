interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  accent?: string
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  accent = "#7FFFD4",
}: SectionHeaderProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
      <div
        style={{
          fontFamily: "monospace",
          color: accent,
          fontSize: "0.8rem",
          letterSpacing: "0.2em",
          marginBottom: "0.75rem",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 900,
          margin: 0,
          color: "#e8e6f0",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: "#6b6f7e",
            marginTop: "0.75rem",
            maxWidth: "520px",
            margin: "0.75rem auto 0",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
