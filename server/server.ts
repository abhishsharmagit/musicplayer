import { Expression } from "typescript";

require("dotenv").config();
const axios = require("axios").default;
import express, { Response, Request, Application } from "express";
//const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const cors = require("cors");
axios.defaults.withCredentials = true;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let access_token = "";
let refresh_token = "";


const generateToken = async (code: any) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const tokens = response.data;
    access_token = tokens.access_token;
    refresh_token = tokens.refresh_token;

    return tokens;
  } catch (error) {
    return error;
  }
};

const getSearch = async (search: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/search`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // "Access-Control-Allow-Origin": "*",
      },
      params: {
        q: `${search}`,
        type: `track`,
        market: "IN",
        limit: 10,
      },
    });

    if (response.status === 200) {
      //return JSON.stringify(response.data);
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

const getNewSongs = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/search",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        q: `charlie puth`,
        type: `track`,
        market: "IN",
        limit: 10,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

const generateRefreshToken = async (token: any) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokens = response.data;
    access_token = tokens.access_token;

    return tokens;
  } catch (error) {
    return error;
  }
};

app.get("/newsongs", async function (req, res) {
  res.send(await getNewSongs());
});

app.post("/search", async function (req, res) {
  let { search } = req.body;

  const searchResult = await getSearch(search);

  res.send(searchResult);
});

app.post("/login", async function (req, res) {
  let { code } = req.body;
  const tokens = await generateToken(code);

 
    console.log("in");
    res.cookie("token", tokens.access_token);
    console.log(req.cookies);
  
  
  //console.log(req.cookies.access)

  res.send({
            accessToken: tokens.access_token,
            refreshToken:tokens.refresh_token,
            expiresIn: tokens.expires_in
          })
});

app.get("/", (req, res) => {
  res.cookie("token", "abcd");
  console.log(req.cookies)
  res.send("working");
});

app.post("/refresh", async (req, res) => {
  const token = refresh_token;
  const refreshToken = await generateRefreshToken(token);
  res.json({
    accessToken: refreshToken.access_token,
    expiresIn: refreshToken.expires_in,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running at the port ${PORT}`);
});
