import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function enviarCorreoVerificacion(usuario, correoDestino) {
  const link = `https://front-public.vercel.app/verificar/${usuario.id}`;

  const msg = {
    to: correoDestino,
    from: 'stackux9@gmail.com',
    subject: 'Verificación de Registro',
    text: `Haz clic en el siguiente enlace para verificar tu registro: ${link}`,
    html: `<p>Haz clic en el siguiente enlace para verificar el registro del usuario <strong>${usuario.name} ${usuario.surname} </strong> , <a href="mailto:${usuario.email}">(${usuario.email})</a> a tu empresa: <a href="${link}">${link}</a></p>`,
  };

  return sgMail.send(msg);
}

function enviarRecuperarContra(email, code){
  const mailOptions = {
    from: 'stackux9@gmail.com',
    to: email,
    subject: 'Código de verificación para recuperar contraseña',
    text: `Tu código de verificación es: <strong>${code} </strong>`,
  };
  return sgMail.send(mailOptions);
}

export{
    enviarCorreoVerificacion,
    enviarRecuperarContra
}