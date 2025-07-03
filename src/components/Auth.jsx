import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { toast } from 'react-toastify'; // Importar toast
import './Auth.css';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Inicio de sesión exitoso!'); // <-- Notificación
      // Firebase maneja la sesión automáticamente. App.jsx detectará el usuario logueado.
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Error al iniciar sesión. Verifica tu email y contraseña.');
      toast.error('Error al iniciar sesión.'); // <-- Notificación
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Usuario registrado y logueado exitosamente!'); // <-- Notificación
    } catch (err) {
      console.error('Error al registrar usuario:', err.message);
      setError('Error al registrar usuario. Asegúrate de usar un email válido y una contraseña de al menos 6 caracteres.');
      toast.error('Error al registrar usuario.'); // <-- Notificación
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión (Administrador)</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="btn-login">Iniciar Sesión</button>
        <button type="button" onClick={handleRegister} className="btn-register">Registrar (Solo para primer uso)</button>
      </form>
      <p className="auth-note">
        **Nota:** Para la primera vez, puedes registrarte con un email y contraseña. Luego, puedes usar esas credenciales para iniciar sesión.
        En un entorno real, la creación de usuarios administradores se haría de forma más segura.
      </p>
    </div>
  );
}

export default Auth;