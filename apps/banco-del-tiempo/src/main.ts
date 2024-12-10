import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import { sendMail } from '/config/mailer';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(session({
  secret: 'banco-del-tiempo-secreto',
  resave: false,
  saveUninitialized: true,
}));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware para verificar la autenticación
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Rutas
app.get('/', (req, res) => {
  res.render('page');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.get('/restablecer-contraseña', (req, res) => {
  res.render('restablecer-password');
});

app.get('/reset-password/:token', (req, res) => {
  res.render('reset-password');
});

app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// API routes
import { authRoutes } from './app/routes/auth';
import { userRoutes } from './app/routes/user';

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

