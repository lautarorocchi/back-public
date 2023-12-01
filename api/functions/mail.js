import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

function enviarCorreoNotificacion(usuario) {
    const mailOptions = {
      from: 'stackux9@gmail.com',
      to: 'lautarorocchi@gmail.com',
      subject: 'Nuevo Registro de Usuario',
      text: `Se ha registrado un nuevo usuario.\n\nNombre: ${usuario.nombre}\nCorreo: ${usuario.email}`,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo de verificación:', error);
    } else {
      console.log('Correo de verificación enviado:', info.response);
    }
  });
}