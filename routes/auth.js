const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { sendMail } = require('../config/mailer');

let users = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' },
];

let resetTokens = {};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = { id: user.id, username: user.username };
    res.json({ success: true, message: 'Login exitoso' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
    }
    res.json({ success: true, message: 'Sesión cerrada exitosamente' });
  });
});

router.post('/registro', (req, res) => {
  const { usuario, password, email, telefono, intereses, servicio, zona, disponibilidad, contacto, comentarios, boletin } = req.body;

  if (users.some(u => u.username === usuario || u.email === email)) {
    return res.status(400).json({ success: false, message: 'El usuario o email ya existe' });
  }

  const newUser = {
    id: users.length + 1,
    username: usuario,
    password: password,
    email: email,
    telefono: telefono,
    intereses: intereses,
    servicio: servicio,
    zona: zona,
    disponibilidad: disponibilidad,
    contacto: contacto,
    comentarios: comentarios,
    boletin: boletin === 'on'
  };

  users.push(newUser);

  // Crear un dashboard para el nuevo usuario con 10 horas iniciales
  const newUserDashboard = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    timeBalance: 10,
    exchanges: []
  };

  // Asumiendo que userDashboards está definido en el ámbito global
  global.userDashboards.push(newUserDashboard);

  // Iniciar sesión automáticamente después del registro
  req.session.user = { id: newUser.id, username: newUser.username };

  res.json({ success: true, message: 'Usuario registrado exitosamente' });
});

router.post('/restablecer-password', async (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  const token = crypto.randomBytes(20).toString('hex');
  resetTokens[token] = { userId: user.id, expiration: Date.now() + 3600000 }; // Token válido por 1 hora

  const resetLink = `http://localhost:3000/reset-password/${token}`;

  try {
    await sendMail(
      user.email,
      'Restablecimiento de contraseña - Banco del Tiempo',
      `Hola ${user.username},\n\nHas solicitado restablecer tu contraseña. Por favor, haz clic en el siguiente enlace para crear una nueva contraseña:\n\n${resetLink}\n\nEste enlace es válido por 1 hora.\n\nSi no has solicitado este cambio, puedes ignorar este correo.\n\nSaludos,\nBanco del Tiempo`
    );
    res.json({ success: true, message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo de restablecimiento' });
  }
});

router.post('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!resetTokens[token] || resetTokens[token].expiration < Date.now()) {
    return res.status(400).json({ success: false, message: 'Token inválido o expirado' });
  }

  const user = users.find(u => u.id === resetTokens[token].userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  user.password = newPassword;
  delete resetTokens[token];

  res.json({ success: true, message: 'Contraseña actualizada exitosamente' });
});

module.exports = router;

