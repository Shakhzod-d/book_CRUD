import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Footer, LoadingSpinner, Navbar, SimpleModal } from "../../components";
import { bookStatusesArr, getHashStrMD5Format } from "./helper";

import {
  createNewBook,
  deleteBookFromShelf,
  editBook,
  getBooks,
} from "../../features/user/userSlice";
import { IDeleteBookObj, IEditBook, INewBook, IUserData } from "./types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export const Home = () => {
  const { key, secret, books, loading } = useSelector(
    (state: any) => state.user
  );
  // console.log(loading);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [bookId, setBookId] = React.useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const signstr = `POST/books${JSON.stringify({
      isbn: inputValue,
    })}${secret}`;

    const hashStr = getHashStrMD5Format(signstr);

    let userData: INewBook = {
      key,
      hashStr,
      newBook: {
        isbn: inputValue,
      },
    };

    if (inputValue.length > 0) {
      dispatch(createNewBook(userData) as any);
      setInputValue("");
      setModalOpen(false);
    } else {
      window.alert("Enter ISBN number please...");
    }
  };

  const deleteBook = (bookId: number) => {
    const sign = `DELETE/books/${bookId}${secret}`;
    const hashStr = getHashStrMD5Format(sign);

    let userData: IDeleteBookObj = {
      key,
      hashStr,
      bookId,
    };

    dispatch(deleteBookFromShelf(userData) as any);
  };

  const openEditModal = (bookObj: any) => {
    setEditModalOpen(true);
    localStorage.setItem("bookObj", JSON.stringify(bookObj));
    setBookId(bookObj?.book?.id);
  };

  const editItem = (statusNumber: any) => {
    const sign = `PATCH/books/${bookId}${JSON.stringify({
      status: statusNumber,
    })}${secret}`;
    const hashStr = getHashStrMD5Format(sign);

    const userData: IEditBook = {
      key,
      bookId,
      hashStr,
      statusObj: {
        status: statusNumber,
      },
    };

    dispatch(editBook(userData) as any);
    setEditModalOpen(false);
  };

  useEffect(() => {
    async function getBooksList() {
      const signstr = `GET/books${secret}`;
      const hashStr = CryptoJS.MD5(signstr).toString();

      const userData: IUserData = {
        key,
        hashStr,
      };

      dispatch(getBooks(userData) as any);
    }
    getBooksList();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userSignUpObj") === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <SimpleModal open={modalOpen} onClose={handleCloseModal}>
        <Box>
          <Typography variant="h5" component="h2">
            Create a new book
          </Typography>
          <br />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              sx={{ minWidth: "270px" }}
              label="Enter book ISBN number"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
              size="small"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </SimpleModal>

      <SimpleModal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box>
          <Typography variant="h5">Choose book status</Typography> <br />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {bookStatusesArr?.map((statusObj) => {
              const { id, title, statusNumber, description } = statusObj;
              let bookObj = JSON.parse(localStorage.getItem("bookObj") || "");
              return (
                <Button
                  disabled={bookObj?.status === statusNumber}
                  onClick={() => editItem(statusNumber)}
                  variant="contained"
                  color="primary"
                  key={id}
                >
                  {description}
                </Button>
              );
            })}
          </Box>
        </Box>
      </SimpleModal>

      <Navbar handleOpenModal={handleOpenModal} />

      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Book List
        </Typography>
        <Grid container spacing={3}>
          {loading !== "pending" && !!books ? (
            books?.map((bookObj: any, idx: number) => {
              // console.log(bookObj);
              return (
                <Grid item key={bookObj?.book?.id || idx} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={bookObj?.book?.title}
                      height="140"
                      image={
                        !!bookObj?.book?.cover
                          ? bookObj?.book?.cover
                          : "https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg"
                      }
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {!!bookObj?.book?.title
                          ? bookObj?.book?.title
                          : "Default book title"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {"Status " + bookObj?.status + " "}
                        {bookObj?.status === 0 && "New"}
                        {bookObj?.status === 1 && "Reading"}
                        {bookObj?.status === 2 && "Finished"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {"Book ID " + bookObj?.book?.id}
                      </Typography>

                      <DeleteIcon
                        sx={{ cursor: "pointer", marginRight: "14px" }}
                        color="error"
                        onClick={() => deleteBook(bookObj?.book?.id)}
                      />

                      <EditIcon
                        sx={{ cursor: "pointer", marginRight: "14px" }}
                        color="primary"
                        fontSize="medium"
                        onClick={() => openEditModal(bookObj)}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <LoadingSpinner />
          )}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
