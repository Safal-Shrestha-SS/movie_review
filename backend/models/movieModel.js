import mongoose from "mongoose";
// const under = ["Completed", "Dropped", "Onhold", "Planning to watch"];
const movieTemplate = new mongoose.Schema({
  movieId: { type: String, required: true },
  movieName: { type: String, required: true },
  userId: { type: String, required: true },
  // fallsUnder: { type: String, required: true },
  poster: { type: String },
  overview: { type: String },
  date: { type: Date, default: Date.now },
  score: { type: Number, default: 0.0 },
  releaseDate: { type: String },
});
export default mongoose.model("movies", movieTemplate);
