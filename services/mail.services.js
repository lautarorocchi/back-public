import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function enviarCorreoVerificacion(usuario, correoDestino, token) {
  const link = `https://front-public.vercel.app/verify/${token}`;

  const msg = {
    to: 'lautarorocchi@gmail.com',
    from: 'stackux9@gmail.com',
    subject: 'Verificación de Registro',
    text: `Haz clic en el siguiente enlace para verificar tu registro: ${link}`,
    html: `<p>Haz clic en el siguiente enlace para verificar el registro del usuario <strong>${usuario.name} ${usuario.surname} </strong> (Email:${usuario.email}) a tu empresa: <a href="${link}">${link}</a></p>`,
  };

  return sgMail.send(msg);
}

export{
    enviarCorreoVerificacion
}