import {IParkType} from './park-type.interface';

export interface IPark {
  id: number;
  name: string;
  type: string;
  location: string;
  park_type: IParkType;
}
