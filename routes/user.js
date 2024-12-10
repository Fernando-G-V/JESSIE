const express = require('express');
const router = express.Router();
const { sendMail } = require('../config/mailer');

let userDashboards = [
  {
    id: 1,
    username: 'user1',
    timeBalance: 15,
    exchanges: [
      { id: 1, service: 'Clases de Inglés', description: 'Clase de conversación', status: 'COMPLETED' },
      { id: 2, service: 'Reparación de Bicicleta', description: 'Arreglo de frenos', status: 'PENDING' },
    ],
  },
  {
    id: 2,
    username: 'user2',
    timeBalance: 8,
    exchanges: [
      { id: 3, service: 'Cuidado de Mascotas', description: 'Paseo de perros', status: 'ACCEPTED' },
      { id: 4, service: 'Clases de Cocina', description: 'Recetas vegetarianas', status: 'COMPLETED' },
    ],
  },
];

let services = [
  { id: 1, title: 'Clases de Inglés', description: 'Clases de conversación en inglés', offeredBy: 'user1' },
  { id: 2, title: 'Reparación de Bicicletas', description: 'Arreglo de frenos y cambios', offeredBy: 'user2' },
];

let users = [
  {id:1, username: 'user1', email: 'user1@example.com'},
  {id:2, username: 'user2', email: 'user2@example.com'}
]

router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const userDashboard = userDashboards.find(u => u.id === req.session.user.id);

  if (userDashboard) {
    res.json(userDashboard);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

router.post('/offer-service', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  const { serviceTitle, serviceDescription } = req.body;
  const newService = {
    id: services.length + 1,
    title: serviceTitle,
    description: serviceDescription,
    offeredBy: req.session.user.username
  };

  services.push(newService);

  res.json({ success: true, message: 'Servicio ofertado con éxito' });
});

router.get('/search-services', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  const { term } = req.query;
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(term.toLowerCase()) ||
    service.description.toLowerCase().includes(term.toLowerCase())
  );

  res.json({ success: true, services: filteredServices });
});

router.post('/request-service', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  const { serviceId } = req.body;
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
  }

  if (service.offeredBy === req.session.user.username) {
    return res.status(400).json({ success: false, message: 'No puedes solicitar tu propio servicio' });
  }

  const userDashboard = userDashboards.find(u => u.id === req.session.user.id);

  if (userDashboard) {
    const newExchange = {
      id: Date.now(), // Usamos timestamp como ID único
      service: service.title,
      description: service.description,
      status: 'PENDING',
      requestedBy: req.session.user.username,
      offeredBy: service.offeredBy
    };

    userDashboard.exchanges.push(newExchange);

    // Añadimos el intercambio al dashboard del usuario que ofrece el servicio
    const offeringUserDashboard = userDashboards.find(u => u.username === service.offeredBy);
    if (offeringUserDashboard) {
      offeringUserDashboard.exchanges.push({...newExchange, status: 'REQUESTED'});
    }

    // Enviar correo al usuario que ofrece el servicio
    const offeringUser = users.find(u => u.username === service.offeredBy);
    if (offeringUser) {
      sendMail(
        offeringUser.email,
        'Nueva solicitud de servicio',
        `Hola ${offeringUser.username},\n\nHas recibido una nueva solicitud para tu servicio "${service.title}".\n\nPor favor, inicia sesión en tu cuenta para aceptar o rechazar la solicitud.\n\nSaludos,\nBanco del Tiempo`
      );
    }

    res.json({ success: true, message: 'Servicio solicitado con éxito' });
  } else {
    res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }
});

router.post('/accept-service', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  const { exchangeId } = req.body;
  const userDashboard = userDashboards.find(u => u.id === req.session.user.id);

  if (!userDashboard) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  const exchange = userDashboard.exchanges.find(e => e.id === exchangeId && e.status === 'REQUESTED');

  if (!exchange) {
    return res.status(404).json({ success: false, message: 'Intercambio no encontrado o no puede ser aceptado' });
  }

  exchange.status = 'ACCEPTED';
  userDashboard.timeBalance += 1; // El que ofrece el servicio gana 1 hora

  // Actualizar el dashboard del usuario que solicitó el servicio
  const requestingUserDashboard = userDashboards.find(u => u.username === exchange.requestedBy);
  if (requestingUserDashboard) {
    const requestingUserExchange = requestingUserDashboard.exchanges.find(e => e.id === exchangeId);
    if (requestingUserExchange) {
      requestingUserExchange.status = 'ACCEPTED';
      requestingUserDashboard.timeBalance -= 1; // El que solicita el servicio pierde 1 hora
    }
  }

  res.json({ success: true, message: 'Servicio aceptado con éxito' });
});

module.exports = router;

