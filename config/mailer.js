const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  
  port: 587,
  auth: {
    user: bdt.jandf@gmail.com', 
    pass: msnchnoaimtaetpx
});


const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Banco del Tiempo" <bdt.jandf@gmail.com>',  
      to,
      subject,
      text
    });
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { sendMail };
