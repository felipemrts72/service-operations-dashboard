interface Props {
  value: number;
}

export default function ProgressBar({ value }: Props) {
  return (
    <div style={{ background: "#ddd", borderRadius: 8, height: 12 }}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: value >= 100 ? "#2ecc71" : "#3498db",
          borderRadius: 8,
          transition: "width 0.3s"
        }}
      />
    </div>
  );
}