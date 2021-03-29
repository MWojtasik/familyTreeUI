export type Person = {
  id?: string,
  name: string,
  lastName: string,
  birth: string,
  death: string,
  children: Person[],
};
