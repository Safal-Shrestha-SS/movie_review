import mongoose from "mongoose";
const signUpTemplate = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
export default mongoose.models.movie || mongoose.model("movie", signUpTemplate, "user");
// module.exports = mongoose.model("myTable", signUpTemplate);
