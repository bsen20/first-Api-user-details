import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./Routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//routes

app.use("/users", usersRoutes);

//routes
app.get("/", (req, res) => {
  res.send("hello from Home page :)");
});

//listeners
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);
