import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function enviarCorreoVerificacion(correoDestino, token) {
  const link = `https://tudominio.com/verificar?token=${token}`;

  const msg = {
    to: 'lautarorocchi@gmail.com',
    from: 'stackux9@gmail.com',
    subject: 'Verificación de Registro',
    text: `Haz clic en el siguiente enlace para verificar tu registro: ${link}`,
    html: `<p>Haz clic en el siguiente enlace para verificar tu registro: <a href="${link}">${link}</a></p>`,
  };

  return sgMail.send(msg);
}

export{
    enviarCorreoVerificacion
}