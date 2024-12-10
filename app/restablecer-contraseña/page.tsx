import React, { useState } from 'react';

const RecuperarContrasena: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    setMessage('Enlace de restablecimiento enviado');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Restablecer Contraseña</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Correo Electrónico
          </label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required 
          />
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Enviar Enlace de Restablecimiento
          </button>
        </div>

        {message && (
          <div 
            id="message" 
            className="text-center mt-4 text-green-600"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default RecuperarContrasena;
