export interface NewUser{
  id: string;
  email: string;
  username: string;
  birthdate: number;
  name: {
    firstname: string;
    lastname: string;
  }
}
