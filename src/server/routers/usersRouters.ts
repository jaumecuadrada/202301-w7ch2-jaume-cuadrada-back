import { Router } from "express";
import multer from "multer";
import { createUser, loginUser } from "../controllers/usersControllers.js";

const usersRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "../../uploads/");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });
const file = upload.single("avatar");

usersRouter.post("/login", loginUser);
usersRouter.post("/register", file, createUser);

export default usersRouter;
