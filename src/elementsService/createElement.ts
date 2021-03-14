import {Person} from '../types';

export function createElement({id, name, lastName, birth, death} : Person) {
  return {
    id: `${id}`,
    type: 'personNode',
    data: {
      name: name,
      lastName: lastName,
      birth: birth,
      death: death,
      id: `${id}`,
    },
    position: { x: 0, y: 0 }
  };
}
