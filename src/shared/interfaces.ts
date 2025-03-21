export interface Navigations{
    title: string;
    route: string;
  }


  export interface UserData {
    categories: string;
    id: string
    title: string
    author: string
    isbn: string;
    count: number;
    image:string;
  }

  export interface RegisterUser {
    username: string
    password: string
    email: string
    phone: string
  }

  export interface UserWithRole extends RegisterUser{
    role: "Librarian" | "Member";
  }
  export type BookDetails = Pick<UserData, "title" | "author" | "isbn">;