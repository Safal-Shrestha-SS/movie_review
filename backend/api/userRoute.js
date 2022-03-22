import express from "express";
import bcrypt from "bcrypt";
import signUpTemplate from "../models/signupModel.js";
const router = express.Router();
router.post("/signup", async (request, response) => {
  const securePassword = await securePass(request.body.password);
  const signedUpUser = new signUpTemplate({
    userName: request.body.userName,
    email: request.body.email,
    password: securePassword,
  });
  signUpTemplate.findOne({ email: request.body.email }, (err, user) => {
    if (user) {
      response.status(400).send({ message: "User already registered" });
    } else {
      signedUpUser.save(function (err, signedUpUser) {
        if (err) return response.status(400).send({ message: err });
        response.json(signedUpUser);
        console.log(signedUpUser.userName + " saved to user collection.");
      });
    }
  });
});
router.post("/login", async (req, res) => {
  signUpTemplate.findOne(
    { userName: req.body.userName },
    async (err, result) => {
      if (err) { response.status(400).send({ message: err }); return }
      else {
        if (result) {
          await bcrypt.compare(
            req.body.password,
            result.password,
            function (err, isMatch) {
              if (err) {
                throw err;
              } else if (!isMatch) {
                res.status(400).send({ message: "Password didn't match" });
                return true;
              } else {
                res.send({
                  message: "Login Successfull",
                  signedUpUser: result,
                });
                return false;
              }
            }
          );
        } else {
          res.status(400).send({ message: "User not registerd" });
        }
      }
    }
  );
});

export default router;
async function securePass(password) {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(password, saltPassword);
  console.log(securePassword);
  return securePassword;
}
