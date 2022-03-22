import express from "express";
import cors from "cors";
import movieapi from "./api/movie.search.js";
import userRoute from "./api/userRoute.js";
import movies from "./api/movie.route.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
const app = express();
app.use(cors());
app.use(express.json());
console.log("hello");
app.get("/", function (request, response) {
  response.redirect("http://localhost:3000/");
});
app.use("/api/userRoute", userRoute);
app.use("/movie.search", movieapi);
app.use("/movie.route", movies);
app.use("*", (req, res) => res.status(404).json({ error: "Page not found" }));

export default app;
dotenv.config();
mongoose.connect(`${process.env.MOVIEREV_DB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(5000, () => console.log("server running"))
}).catch((error) => console.log(error.message));



mongoose.set('useFindAndModify', false)