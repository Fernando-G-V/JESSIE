const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { sendMail } = require('./config/mailer');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const sslPort = process.env.SSL_PORT || 443;

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist', 'public')));
app.use(session({
  secret: 'banco-del-tiempo-secreto',
  resave: false,
  saveUninitialized: true,
}));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para verificar la autenticación
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.get('/restablecer-password', (req, res) => {
  res.render('restablecer-password');
});

app.get('/reset-password/:token', (req, res) => {
  res.render('reset-password');
});

app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// API routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// HTTP server
app.listen(port, () => {
  console.log(`Servidor HTTP corriendo en http://localhost:${port}`);
});

// HTTPS server
try {
  const httpsOptions = {
    key: fs.readFileSync('./ssl/localhost.key'),
    cert: fs.readFileSync('./ssl/localhost.crt')
  };

  https.createServer(httpsOptions, app).listen(sslPort, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${sslPort}`);
  });
} catch (error) {
  console.error('No se pudo iniciar el servidor HTTPS:', error.message);
  console.log('Asegúrate de generar los archivos SSL necesarios en la carpeta ./ssl/');
}

