const express = require("express");
const { config } = require("dotenv");

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
