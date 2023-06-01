import { Adress } from "./adress";

export type User = {
    identificationString: string
    firstName:string
    lastName:string
    birthDate: string
    adress: Adress
    phone: string
    email: string
    password: string
  };