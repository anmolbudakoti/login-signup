const express = require('express');
const app = express();
require("dotenv").config();
require('./models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/AuthRouter');

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});