'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" className="login-button">Enter the Matrix</button>
      </form>

      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: radial-gradient(circle at top right, #2e026d, #090016 60%);
          color: #fff;
          font-family: 'Roboto', sans-serif;
        }

        .login-form {
          background: rgba(0, 0, 0, 0.8);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.3);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        .login-title {
          font-size: 2rem;
          color: #f0f;
          text-shadow: 0 0 10px #f0f, 0 0 20px #f0f, 0 0 40px #f0f;
          margin-bottom: 1.5rem;
          font-family: 'Orbitron', sans-serif;
        }

        .login-input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: none;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 1rem;
          outline: none;
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .login-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .password-container {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          outline: none;
        }

        .login-button {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          background: linear-gradient(90deg, #f0f, #0ff);
          color: #000;
          font-weight: bold;
          font-size: 1.2rem;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-button:hover {
          box-shadow: 0 0 10px #f0f, 0 0 20px #0ff, 0 0 30px #f0f;
        }
      `}</style>
    </div>
  );
}
