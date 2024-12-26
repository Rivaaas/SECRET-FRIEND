import React from 'react'
import { useState } from 'react'



const Form = ({ onAddParticipant }) => {
  const [Members, setMembers] = useState({
    name: "",
    mail: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Members.name.trim() !== "") {
      onAddParticipant(Members)
      setMembers({ name: "", mail: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembers((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Nombre del participante'
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Email'
          name="mail"
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
}


export default Form;