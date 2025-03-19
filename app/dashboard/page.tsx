"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const flag = "FLAG{SQL_MASTER_42}";
  const canvasRef = useRef(null);

  useEffect(() => {
    if (pathname !== "/dashboard") return;

    const isAuthenticated = true;
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }

    // Inicia o efeito Matrix no fundo
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const letters = "0123456789ABCDEF";
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops = new Array(Math.floor(columns)).fill(0);

      function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0aff0a";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillText(text, x, y);

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      setInterval(drawMatrix, 50);
    }
  }, [pathname, router]);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(flag);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = flag;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="dashboard-container">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="content">
        <h1 className="dashboard-title">Bem-vindo à Área Restrita</h1>
        <p className="dashboard-text">
          Você entrou na <span className="matrix">Matrix</span>. Apenas usuários autorizados podem acessar esta área.
        </p>

        {/* Flag visível com botão de cópia */}
        <div className="flag-container">
          <p className="flag-text">{flag}</p>
          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? "Copiado!" : "Copiar Flag"}
          </button>
        </div>

        <button className="dashboard-button" onClick={() => router.push("/")}>
          Desconectar
        </button>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

        .dashboard-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          color: #00ff00;
          font-family: "Roboto Mono", monospace;
          background: black;
        }

        .matrix-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .dashboard-title {
          font-size: 2.5rem;
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
          margin-bottom: 1rem;
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
        }
      `}</style>
    </div>
  );
}
