export interface IUserObj {
  key: string;
  secret: string;
  auth: boolean;
}

export interface IBookObj {
  author: string;
  cover: string;
  id: number;
  isbn: string;
  pages: number;
  published: number;
  title: string;
}

export interface IEachBook {
  book: IBookObj;
  status: number;
}

export interface UsersState extends IUserObj {
  books: IEachBook[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}
