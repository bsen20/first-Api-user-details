import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

// all routes in here are staritng with  /users
router.get("/", getUser);

//create userss
router.post("/", createUser);

//get user by id
router.get("/:id", getUserById);

//delete users by id
router.delete("/:id", deleteUser);

//edit user details
router.patch("/:id", updateUser);
export default router;
