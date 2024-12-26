// En tu componente React

const sendEmail = async () => {
    const response = await fetch('/api/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'destinatario@example.com', // Dirección de destino
        subject: 'Asunto del correo',
        text: 'Contenido del correo',
      }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log('Correo enviado:', data);
    } else {
      console.log('Error al enviar correo:', data.error);
    }
  };
  