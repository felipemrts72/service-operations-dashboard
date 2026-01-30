import { useEffect, useState } from "react";

interface Props {
  title: string;
}

export default function HeaderBar({ title }: Props) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      style={{
        height: 72,
        background: "#1f2933",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        position: "relative",
        borderBottom: "2px solid #111827"
      }}
    >
      {/* Esquerda */}
      <div style={{ fontSize: 20, fontWeight: 600 }}>
        Torneadora Universal
      </div>

      {/* Centro */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 24,
          fontWeight: 700
        }}
      >
        {title}
      </div>

      {/* Direita */}
      <div
        style={{
          marginLeft: "auto",
          textAlign: "right",
          fontSize: 18,
          lineHeight: 1.2
        }}
      >
        <div>{dateTime.toLocaleDateString("pt-BR")}</div>
        <div>{dateTime.toLocaleTimeString("pt-BR")}</div>
      </div>
    </header>
  );
}
