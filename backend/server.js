const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

const app = express();
const { create, list, update, remove } = require("./controllers/products");

//database configuration
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
  .catch((error) => console.log("DB CONNECTION ERROR", error));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// //routes
// readdirSync("./routes").map((r) =>
//   app.use("/api", () => require("./routes/" + r))
// );

app.get("/", (req, res) => {
  res.json({ status: "success", message: "BACKEND IS WORKING!" });
});

app.get("/api/products", list);

app.post("/api/add/product", create);

app.put("/api/update/product", update);

app.delete("/api/delete/product", remove);

const port = process.env.PORT || 8000;

//Initiating Server
app.listen(port, () => console.log("server is running on port " + port));
