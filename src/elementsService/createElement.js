export function createElement({id, name, surname, dateOfBirth, dateOfDeath}) {
  return {
    id: `${id}`,
    type: 'personNode',
    data: {
      name: name,
      surname: surname,
      dateOfBirth: dateOfBirth,
      dateOfDeath: dateOfDeath,
      id: `${id}`,
    },
    position: { x: 0, y: 0 }
  };
}
