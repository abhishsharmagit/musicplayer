// const express = require("express")
// const app = express();
// const SpotifyWebApi = require("spotify-web-api-node")
// const PORT = 3001 || process.env.PORT
// const cors = require("cors")

// app.use(cors());


// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.refreshToken
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: "http://localhost:3000",
//     clientId: "0882e218b9ff4e169ccf5df2227a5053",
//     clientSecret: "a8e5b5258c6c4cd1be01aed2ad7f56f1",
//     refreshToken,
//   })
//   console.log(refreshToken)
//   spotifyApi
//     .refreshAccessToken()
//     .then(data => {

//       res.json({
//         accessToken: data.body.accessToken,
//         expiresIn: data.body.expiresIn,
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.sendStatus(400)
//     })
// })

// app.post("/api/token", async (req, res)=>{

//  const code = req.body.code

//  const spotifyApi = new SpotifyWebApi({
//   redirectUri: "http://localhost:3000",
//   clientId: "0882e218b9ff4e169ccf5df2227a5053",
//   clientSecret: "a8e5b5258c6c4cd1be01aed2ad7f56f1"
//  })
//  spotifyApi
//     .authorizationCodeGrant(code)
//     .then(data => {
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       })
//     })
//     .catch(err => {
//       res.sendStatus(400)
//     })

// })

// app.listen(PORT, ()=>{
//  console.log("server is running on "+ PORT)
// })
require("dotenv").config();
const axios = require("axios").default;
const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
//const SCOPES = process.env.SCOPES;
const PORT = process.env.PORT;

app.use(cors());
app.use(cookie());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let access_token = "";
let refresh_token = "";

const generateToken = async (code) => {
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

const getSearch = async (search) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/search`,
      headers: {
        Authorization: `Bearer ${access_token}`
        // "Access-Control-Allow-Origin": "*",
      },
      params: {
                q: `${search}`,
                type: `track`,
                market: "IN",
                limit: 10
              }
    });
    console.log("hello")
    if (response.status === 200) {
      
      //return JSON.stringify(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error.message)
    return error;
  }
};

// const getNewRelease = async () => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: "https://api.spotify.com/v1/browse/new-releases",
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         "Access-Control-Allow-Origin": "*",
//       },
//       params: {
//         country: "IN",
//         limit: 50,
//       },
//     });
//     if (response.status === 200) {
//       return response.data;
//     }
//   } catch (error) {
//     return error;
//   }
// };

// app.get("/health", function (req, res) {
//   res.send("Health Checkup Is Working");
// });

// app.get("/login", function (req, res) {
//   return res.send(
//     `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
//   );
// });

app.post("/search", async function (req, res) {
  console.log("hi")
  let {search} = req.body
  console.log(search)
  const searchResult = await getSearch(search);
  //const ok = JSON.stringify(searchResult)
  res.send(searchResult);
});

app.post("/login", async function (req, res) {
  // let code = req.query.code || null;
 
    let {code} = req.body
  //console.log(code)
  //var code = "x"
  //if (code === null) res.redirect("/error");

  const tokens = await generateToken(code);
  // res.cookie("access-token", access_token);
  // res.cookie("refresh-token", refresh_token);
  // if (tokens) {
  //   const response = await getMe();
  //   if (response.data) {
  //     res.cookie("user", response.data);
  //   }
  //  // res.send("<script>window.close()</script>");
  // }
  
  res.json({
            accessToken: tokens.access_token,
            refreshToken:tokens.refresh_token,
            expiresIn: tokens.expires_in
          })
  
  
});

app.listen(PORT, () => {
  console.log(`Serve is up and running at the port ${PORT}`);
});
