import IOwner from "./IOwner";

export default interface IPet {
  id: string;
  name: string;
  age: number;
  type: string;
  breed: string;
  owner: IOwner;
}
