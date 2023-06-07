import React from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components";
import { createNewBook } from "../home/helper";

import "./createBook.css";

export const CreateBook = () => {
  const [isbn, setIsbn] = React.useState("");
  const navigate = useNavigate();

  const createNewBookFunc = async () => {
    const url = `https://no23.lavina.tech/books`;
    const body = {
      isbn,
    };

    const key = localStorage.getItem("key");
    const userSecret = localStorage.getItem("secret");
    const signstr = `POST/books${JSON.stringify({ isbn })}${userSecret}`;

    const hashStr = CryptoJS.MD5(signstr).toString();
    let resData;
    if (isbn.length > 3) {
      resData = await createNewBook("POST", url, key, hashStr, body);
    } else {
      window.alert("Please fill the book ISBN number");
    }

    if (resData?.isOk) {
      navigate(`/home`);
    }
  };

  return (
    <div>
      <Header pathname={`/createBook`} />
      <main className="box">
        <h2 style={{ color: "#FFF" }}>Create book</h2>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          name=""
          placeholder="Enter a isbn number"
        />
        <input onClick={createNewBookFunc} type="submit" value="Create" />
      </main>
    </div>
  );
};
