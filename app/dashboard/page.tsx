import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const flag = "FLAG{SQL_MASTER_42}";

  useEffect(() => {
    // Aqui é onde você verificaria o token de autenticação do usuário
    const isAuthenticated = true; // Simulação, troque pela verificação real

    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(flag);
    alert("Flag copiada para a área de transferência!");
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="matrix-overlay"></div>
      <div className="content">
        <h1 className="dashboard-title">Bem-vindo à Área Restrita</h1>
        <p className="dashboard-text">
          Você entrou na <span className="matrix">Matrix</span>. Apenas usuários autorizados podem acessar esta área.
        </p>

        {/* Flag visível */}
        <div className="flag-container">
          <p className="flag-text">{flag}</p>
          <button className="copy-button" onClick={copyToClipboard}>
            Copiar Flag
          </button>
        </div>

        <button className="dashboard-button" onClick={() => router.push('/')}>
          Desconectar
        </button>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

        .dashboard-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          color: #00ff00;
          font-family: 'Roboto Mono', monospace;
          background: black;
        }

        .matrix-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          overflow: hidden;
          z-index: 1;
        }

        .matrix-overlay::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background: url('https://i.imgur.com/mDoZ2iK.png') repeat;
          opacity: 0.2;
          animation: matrixRain 10s infinite linear;
          position: absolute;
        }

        @keyframes matrixRain {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .dashboard-title {
          font-size: 2.5rem;
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
          margin-bottom: 1rem;
        }

        .dashboard-text {
          font-size: 1.2rem;
          color: #00ff00;
          text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
          margin-bottom: 2rem;
        }

        .matrix {
          color: #0aff0a;
          font-weight: bold;
        }

        .flag-container {
          background: rgba(0, 255, 0, 0.1);
          padding: 10px;
          border-radius: 5px;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .flag-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00;
          margin-bottom: 0.5rem;
        }

        .copy-button {
          padding: 0.5rem 1rem;
          border: 2px solid #00ff00;
          background: transparent;
          color: #00ff00;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .copy-button:hover {
          background: #00ff00;
          color: #000;
          text-shadow: none;
        }

        .dashboard-button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #00ff00;
          background: transparent;
          color: #00ff00;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .dashboard-button:hover {
          background: #00ff00;
          color: #000;
          text-shadow: none;
        }
      `}</style>
    </div>
  );
}