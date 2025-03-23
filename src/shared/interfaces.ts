export interface Navigations{
    title: string;
    route: string;
  }


  export interface BookData {
    _id:string;
    id: string;
    title: string;
    pages: string;
    author: string;
    isbn: string;
    image:string;
    categories: string;
    count: number;
  }

  export interface RegisterUser {
    _id: string
    id: string;
    username: string
    password: string
    email: string
    phone: string
  }

  export interface UserWithRole extends RegisterUser{
    role: "Librarian" | "Member";

  }