import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signupUrl, booksUrl, mySelfUrl } from "../../api";
import { ApiResponse } from "../../pages/login/types";
import {
  IDeleteBookObj,
  IEditBook,
  INewBook,
  IUserData,
} from "../../pages/home/types";
import { IUserObj, UsersState } from "./types";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (newUser: ApiResponse, { rejectWithValue }) => {
    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (!!responseData || responseData.isOk) {
        const { key, secret } = responseData.data;
        const userSignUpObj = {
          key,
          secret,
          auth: true,
        };

        localStorage.setItem("userSignUpObj", JSON.stringify(userSignUpObj));
      }

      return responseData;
    } catch (error: any) {
      rejectWithValue(error);
      console.error(error.message || "An error occurred");
    }
  }
);

export const getBooks = createAsyncThunk(
  "books/fetch",
  async (userData: IUserData) => {
    const response = await fetch(booksUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        key: userData.key,
        sign: userData.hashStr,
      },
    });

    const responseData = await response.json();

    return responseData?.data;
  }
);

export const getMySelf = createAsyncThunk(
  "user/myself",
  async (userData: IUserData) => {
    const response = await fetch(mySelfUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        key: userData.key,
        sign: userData.hashStr,
      },
    });

    const responseData = await response.json();
    console.log("responseData", responseData);
    return responseData;
  }
);

export const deleteBookFromShelf = createAsyncThunk(
  "book/deleteBookFromShelf",
  async (userData: IDeleteBookObj) => {
    const { hashStr, bookId, key } = userData;
    const deleteUrl = `${booksUrl}/${bookId}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        key: key,
        sign: hashStr,
      },
    });

    if (response.ok) {
      const responseData = await response.json();

      return responseData.data;
    }
  }
);

export const createNewBook = createAsyncThunk(
  "book/createNewBook",
  async (userData: INewBook, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(booksUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key: userData.key,
          sign: userData.hashStr,
        },
        body: JSON.stringify(userData.newBook),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (!!responseData || responseData.isOk) {
        const newBookObj = {
          book: responseData.data,
          status: 0,
        };
        return newBookObj as any;
      }
    } catch (error: any) {
      rejectWithValue(error);
      console.error(error.message || "An error occurred");
    }
  }
);

export const editBook = createAsyncThunk(
  "book/editBook",
  async (userData: IEditBook, { dispatch }) => {
    const { hashStr, bookId, key, statusObj } = userData;
    const editUrl = `${booksUrl}/${bookId}`;

    const response = await fetch(editUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        key: key,
        sign: hashStr,
      },
      body: JSON.stringify(statusObj),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    }
  }
);

let userRegisterInfo: IUserObj = {
  key: "",
  secret: "",
  auth: false,
};

const getUserInfo = () => {
  if (localStorage.getItem("userSignUpObj") === null) {
    return userRegisterInfo;
  } else {
    return JSON.parse(localStorage.getItem("userSignUpObj") || "");
  }
};

const initialState: UsersState = {
  ...getUserInfo(),
  books: [],
  loading: "idle",
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        const { id, email, name, ...restObj } = action?.payload?.data;

        state.key = restObj.key;
        state.secret = restObj.secret;
        state.auth = true;
      })
      .addCase(createNewBook.fulfilled, (state, action) => {
        state.books.push(action?.payload);
      })
      .addCase(getBooks.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action?.payload === null ? [] : action?.payload;
        state.loading = "succeeded";
      })
      .addCase(deleteBookFromShelf.fulfilled, (state, action) => {
        state.books = action?.payload;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.books = state.books?.map((item: any) => {
          if (item?.book?.id === action.payload.book.id) {
            let newStatusOfBook = { ...item, status: action.payload.status };
            return newStatusOfBook;
          } else {
            return item;
          }
        });
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
