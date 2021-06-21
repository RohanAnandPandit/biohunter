import Database from "./database";

const path = require('path');
const express = require('express');
const cors = require('cors'); // ADDED
const bodyParser = require('body-parser'); // ADDED
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('../../frontend/build'));
}

const app = express();

const publicPath = path.join(__dirname, '..', 'public');

const port = process.env.PORT || 5000;

app.use(cors()); // ADDED

app.use(express.json());

// app.use(bodyParser.json()); // ADDED

// app.use(bodyParser.urlencoded({extended: true })); // ADDED

// app.use(express.static(publicPath));

app.post("/users", async (req, res) => {
   try {
     req.body.password = await bcrypt.hash(req.body.password, 10);
     const result = await Database.newUser(req.body);
     console.log(result);
     res.json(result);
   } catch (error) {
     res.body = "Error: " + error;
   }
 });

 app.post("/users/login", async (req, res) => {
  try {
    const user = await Database.authUser({ email: req.body.email });
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.cookie("userId", user.user_id, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 86400 * 1000,
      });
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/animal", async (req, res) => {
   try {
     const result = await Database.getAnimal(req.body);
     console.log(result);
     res.json(result);
   } catch (error) {
     res.body = "Error: " + error;
   }
 });

app.get('*', (req, res) => {
  res.sendFile(path.join(require(__dirname + '/../../frontend/build/index.html')))
});

app.listen(port, () => {
   console.log('Server is up!');
});