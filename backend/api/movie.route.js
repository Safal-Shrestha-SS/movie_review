import express from "express";
import movieTemplate from "../models/movieModel.js";
const router = express.Router();
router.post("/movieUpload", async (request, response) => {
  const movie = new movieTemplate({
    movieId: request.body.movieId,
    movieName: request.body.movieName,
    userId: request.body.userId,
    // fallsUnder: request.body.fallsUnder,
    poster: request.body.poster,
    overview: request.body.overview,
    score: request.body.score,
    releaseDate: request.body.releaseDate
  });
  try {
    let data = await movieTemplate.findOne({ movieId: request.body.movieId, userId: request.body.userId })
    if (data) {
      return response.status(200).send({ message: "Movie already added" });

    }
    else {
      await movie.save(function async(err, movie) {
        if (err) return response.status(400).send({ message: err });
        // response.json(movie);
        return response.status(200).send({ message: movie.movieName + " saved to your collection." })

      });
    }

  }
  catch (error) {

    console.log(error)
  }
});
router.put("/editMovie", (request, response) => {
  const body = request.body;
  movieTemplate.findOneAndUpdate(
    {
      movieId: body.movieId,
      userId: body.userId,
    },
    body,
    (err, movie) => {
      if (err) return console.error(err);
      response.json(movie);
      console.log(movie.userName + " edited to movie collection.");
      return
    }
  );
});
router.get("/allmovies", (request, response) => {
  console.log(request.query.userId)
  movieTemplate.find({ userId: request.query.userId }, (err, movies) => {
    response.send(movies);
    console.log(movies)
    return
  });
});

export default router;
