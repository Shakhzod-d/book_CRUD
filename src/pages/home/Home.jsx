import React, { useEffect } from "react";
import CryptoJS from "crypto-js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { BookCard, Header, Modal } from "../../components";
import { changeStatus, getBooks } from "./helper";

import "./Home.css";

export const Home = () => {
  const [books, setBooks] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [bookId, setBookId] = React.useState("");

  const key = localStorage.getItem("key");
  const userSecret = localStorage.getItem("secret");
  const booksUrl = `https://no23.lavina.tech/books`;
  const signstr = `GET/books${userSecret}`;

  const deleteBook = async (bookId) => {
    const sign = `DELETE/books/${bookId}${userSecret}`;
    const hashStr = CryptoJS.MD5(sign).toString();
    const url = `${booksUrl}/${bookId}`;

    const resData = await getBooks(`DELETE`, url, key, hashStr);
    if (resData.isOk) {
      const resData = await getBooks(
        `GET`,
        booksUrl,
        key,
        CryptoJS.MD5(signstr).toString()
      );
      setBooks(resData.data);
    }
  };

  const openModal = (id) => {
    setOpen(true);
    setBookId(id);
  };

  const editItem = async () => {
    const sign = `PATCH/books/${bookId}/${userSecret}/`;
    const hashStr = CryptoJS.MD5(sign).toString();
    const url = `${booksUrl}/${bookId}`;
    const obj = {
      status,
    };

    const resData = await changeStatus(`PATCH`, url, key, hashStr, obj);
    console.log(resData);
  };

  useEffect(() => {
    const hashStr = CryptoJS.MD5(signstr).toString();

    async function getBooksList() {
      const resData = await getBooks(`GET`, booksUrl, key, hashStr);
      setBooks(resData.data);
    }
    getBooksList();
  }, []);

  return (
    <div>
      <Modal open={isOpen}>
        <h2>Modal</h2>
        <div className="edit_container">
          <TextField
            id="outlined-basic"
            label="Enter status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Button onClick={editItem} variant="contained">
            Submit
          </Button>
        </div>
      </Modal>
      <Header pathname={`/createBook`} />
      <main className="card_list_container">
        {books?.map((item) => {
          return (
            <BookCard
              key={item.book.id}
              item={item}
              deleteBook={deleteBook}
              editItem={openModal}
            />
          );
        })}
      </main>
    </div>
  );
};
