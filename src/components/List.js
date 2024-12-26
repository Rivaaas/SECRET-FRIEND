import React from "react";

const List = ({ participants, deleteParticipant }) => {
  return (
    <ul>
      {participants.map((members, index) => 
        <li key={index}>
          <a>{members.name}</a> <a>{members.mail}</a>
          <button onClick={() => deleteParticipant(index)}>Eliminar</button>
        </li>
      )}
    </ul>
    )
}

export default List;