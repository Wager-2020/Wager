

const passport = require('passport');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');




const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const users = require("./routes/api/users");
const wagers = require("./routes/api/wagers");
const bets = require("./routes/api/bets");
const messages = require("./routes/api/messages");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/wagers", wagers);
app.use("/api/bets", bets);
app.use("/api/messages", messages);


const path = require('path');
// app.use(express.static(path.join("styles", "main.scss")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const Seeds = require("./config/seeds");

const SHOULD_SEED = false;
if (SHOULD_SEED) {
  Seeds.seed();
}

// Seeds.reset({ msg: true, wager: false, bet: true});