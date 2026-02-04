import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/auth';

interface Props {
  title: string;
}

export default function HeaderBar({ title }: Props) {
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      style={{
        height: 90,
        background: '#111827',
        color: '#ffffff',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        alignItems: 'center',
        padding: '0 32px',
        borderBottom: '3px solid #1f2933',
      }}
    >
      {/* ESQUERDA — LOGO + NOME */}
      <div
        onClick={() => navigate('/tv')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
        }}
      >
        <img
          src="/src/images/logo.png"
          alt="Logo Torneadora Universal"
          style={{
            height: 48,
            objectFit: 'contain',
          }}
        />

        <span style={{ fontSize: 18, fontWeight: 600 }}>
          Torneadora Universal
        </span>
      </div>

      {/* CENTRO — TÍTULO */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>

      {/* DIREITA — AÇÕES */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 14,
        }}
      >
        {role === 'admin' && (
          <>
            <button onClick={() => navigate('/create')} style={navButtonStyle}>
              Criar Serviço
            </button>

            <button onClick={() => navigate('/update')} style={navButtonStyle}>
              Atualizar Serviço
            </button>
          </>
        )}

        <div
          style={{
            textAlign: 'right',
            fontSize: 14,
            opacity: 0.85,
            marginLeft: 12,
          }}
        >
          <div>{dateTime.toLocaleDateString('pt-BR')}</div>
          <div>{dateTime.toLocaleTimeString('pt-BR')}</div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          style={{
            padding: '6px 10px',
            background: '#dc2626',
            border: 'none',
            borderRadius: 6,
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Sair
        </button>
      </div>
    </header>
  );
}

const navButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: '#1f2933',
  border: '1px solid #374151',
  borderRadius: 6,
  color: '#ffffff',
  cursor: 'pointer',
  fontWeight: 600,
};
