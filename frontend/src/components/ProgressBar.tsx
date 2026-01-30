interface ProgressBarProps {
  value: number; // 0 a 100
  color?: string; // cor dinâmica
}

export default function ProgressBar({ value, color = "#2ecc71" }: ProgressBarProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 10,
        borderRadius: 6,
        background: "#e5e7eb",
        overflow: "hidden",
        marginTop: 8
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: color,
          transition: "width 0.5s ease"
        }}
      />
    </div>
  );
}