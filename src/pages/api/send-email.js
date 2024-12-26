import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Asegúrate de que la clave de API esté correctamente configurada en .env

export default async function handler(req, res) {
  console.log('Solicitud recibida');  // Esto te ayudará a verificar si la API está siendo alcanzada


  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    console.log('Cuerpo de la solicitud:', req.body); // Esto te permite ver el cuerpo que estás recibiendo

    const msg = {
      to,
      from: 'rivaaas.v@gmail.com', // Asegúrate de que el correo esté verificado en SendGrid
      subject,
      text,
    };

    try {
      await sgMail.send(msg); // Enviar correo a través de SendGrid
      console.log('Correo enviado exitosamente');
      res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
      console.error('Error al enviar correo:', error); // Aquí también puedes ver el error
      res.status(500).json({ error: 'Error al enviar correo', details: error.response ? error.response.body : error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' }); // En caso de que se use un método diferente a POST
  }

  
}
