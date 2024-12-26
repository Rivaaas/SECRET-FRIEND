
export const asingFriends = (participants) => {
    let mezcla = [...participants].sort(() => Math.random()- 0.5);
    let asignaciones = {};

    participants.forEach((participant, index) => {
        asignaciones[participant.mail] = mezcla[(index + 1) % mezcla.length].mail
    })

  return asignaciones
}
