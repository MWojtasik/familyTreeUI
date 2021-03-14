import {Person} from '../types';
import {Node} from 'react-flow-renderer';
import { v1 as uuid } from 'uuid';

export function createNode({name, lastName, birth, death} : Person): Node {
  const id = uuid();
  return {
    id,
    type: 'personNode',
    data: {
      name: name,
      lastName: lastName,
      birth: birth,
      death: death,
      id,
    },
    position: { x: 0, y: 0 }
  };
}
