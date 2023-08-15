export interface IUserData {
  key: string;
  hashStr: string;
}

export interface INewBook {
  key: string;
  hashStr: string;
  newBook: {
    isbn: string;
  };
}

export interface IDeleteBookObj {
  key: string;
  hashStr: string;
  bookId: number;
}

export interface IEditBook {
  key: string;
  bookId: number;
  hashStr: string;
  statusObj: {
    status: number;
  };
}
