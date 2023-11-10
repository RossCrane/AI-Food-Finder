'use strict';

require('dotenv').config();
const express = require("express")
const router = require("./router");
const cors = require('cors')
const app = new express()

app.use(cors());
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});