import { Node } from 'react-flow-renderer';
import { v1 as uuid } from 'uuid';
import { Person } from '../types';

export function createNode({
  name, lastName, birth, death,
} : Person): Node {
  const id = uuid();
  return {
    id,
    type: 'personNode',
    data: {
      name,
      lastName,
      birth,
      death,
      id,
    },
    position: { x: 0, y: 0 },
  };
}
