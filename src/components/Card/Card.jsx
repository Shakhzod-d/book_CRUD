import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

export function BookCard({ item, deleteBook, editItem }) {
  const { book, status } = item;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={book.cover}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Published: {book.published}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => editItem(book.id)} size="small">
          <AiTwotoneEdit size={24} />
        </Button>
        <Button onClick={() => deleteBook(book.id)} size="small">
          <AiTwotoneDelete size={24} />
        </Button>
      </CardActions>
    </Card>
  );
}
