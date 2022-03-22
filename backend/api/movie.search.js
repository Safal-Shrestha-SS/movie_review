import dotenv from "dotenv";
import express from "express";
import axios from "axios";
const router = express.Router();

dotenv.config();

router.get("/search", async (request, response) => {
  var url = new URL(process.env.TMDB_DB_URI);
  var search_params = url.searchParams;
  search_params.set("query", request.query.movie);
  url.search = search_params.toString();

  var new_url = url.toString();
  axios
    .get(new_url)
    .then((movie) => {
      response.send(movie.data)
      // console.log(request.query.movie)
    })
    .catch((err) => response.status(400).send({ message: err }));
});
export default router;
