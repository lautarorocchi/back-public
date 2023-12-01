import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function enviarCorreoVerificacion(correoDestino, token, usuario) {
  const link = `https://front-public.vercel.app/verify/${token}`;

  const msg = {
    to: 'lautarorocchi@gmail.com',
    from: 'stackux9@gmail.com',
    subject: 'Validar usuario nuevo para la empresa',
    text: `Se ha detectado un nuevo usuario en la base de datos de tu empresa. Nombre Completo: ${usuario.name}, ${usuario.surname}. Email: ${usuario.email}
    Haz clic en el siguiente enlace para verificar a en la empresa: ${link}`,
    html: `<p>Haz clic en el siguiente enlace para verificar un nuevo usuario: <a href="${link}">${link}</a></p>`,
  };

  return sgMail.send(msg);
}

export{
    enviarCorreoVerificacion
}