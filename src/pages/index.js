import React, { useState } from 'react';
import Form from '../components/Form';
import List from '../components/List';
import { asingFriends } from '../utils/Asing';


function App() {
  const [participants, setParticipants] = useState([]);
  const [result, setResults] = useState(null);
  const [mailParticipants, setMailParticipants] = useState("");



  const addParticipants = (members) => {
    setParticipants([...participants, members]);
  };

  const deleteParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const generateFriends = () => {
    if (participants.length < 2) {
      alert('Necesitas al menos 2 participantes');
      return;
    }

    const asignaciones = asingFriends(participants);
    setResults(asignaciones);
    sendEmails(asignaciones);
  };

  const sendEmail = async (to, subject, text) => {
    try {
      const response = await fetch(`${process.env.SENDGRID_API_KEY}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to, // Dirección de correo
          subject, // Asunto del correo
          text, // Contenido del correo
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`Correo enviado exitosamente a ${to}:`, data);
      } else {
        console.log(`Error al enviar correo a ${to}:`, data.error);
      }
    } catch (error) {
      console.error(`Error al intentar enviar correo a ${to}:`, error);
    }
  };

  const sendEmails = async (asignaciones, participants) => {
    for (const [key, value] of Object.entries(asignaciones)) {

      // Enviar correo a `key`
      await sendEmail(
        key,
        'Amigo Secreto',
        `Hola ${key}, te ha tocado ${value} como tu amigo secreto. ¡Cuida bien este secreto!`
      );

      // Enviar correo a `value`
      await sendEmail(
        value,
        'Amigo Secreto',
        `Hola ${value}, te ha tocado ${key} como tu amigo secreto. ¡Cuida bien este secreto!`
      );
    }
  };

  return (
    <>
      <h1>Juego del amigo secreto</h1>
      {!result ? (
        <>
          <Form onAddParticipant={addParticipants} />
          <List participants={participants} deleteParticipant={deleteParticipant} />
          <button onClick={generateFriends}>Generar amigos secretos</button>
        </>
      ) : (
        <div>
          <h2>Resultados</h2>
          <h1>RESULTADOS ENVIADOS A LOS CORREOS DE LOS PARTICIPANTES !:)</h1>
          <button onClick={() => setResults(null)}>Reiniciar</button>
        </div>
      )}
    </>
  );
}

export default App;
