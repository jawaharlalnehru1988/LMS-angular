export interface Navigations{
    title: string;
    route: string;
  }


  export interface UserData {
    id: string
    title: string
    author: string
    isbn: string
    status: "AVAILABLE" | "BORROWED" | "OVERDUE";
    borrowedId?: string
    borrowedDate?: string
    returnDueDate?: string
  }

  export interface RegisterUser {
    username: string
    password: string
    email: string
    phone: string
  }
  export type BookDetails = Pick<UserData, "title" | "author" | "isbn">;