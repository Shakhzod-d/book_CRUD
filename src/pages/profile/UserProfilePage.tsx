import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";

import { getMySelf } from "../../features/user/userSlice";
import { IUserData } from "../home/types";
import { getHashStrMD5Format } from "../home/helper";

export const UserProfilePage: React.FC = () => {
  const { key, secret } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const signstr = `GET/myself${secret}`;
    const hashStr = CryptoJS.MD5(signstr).toString();

    const userData: IUserData = {
      key,
      hashStr,
    };
    // console.log("userData", userData);
    // console.log(getHashStrMD5Format(signstr));

    dispatch(getMySelf(userData) as any);
  }, []);

  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  return (
    <div>
      <Typography variant="h3" textAlign={"center"}>
        User Profile
      </Typography>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt={user.username} src={user.avatarUrl}>
                <AccountCircle />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1">
            This is your user info page. You can customize this section with
            additional details about the user.
          </Typography>
          <Link to={"/"}>Go back Home page</Link>
        </Paper>
      </Container>
    </div>
  );
};
