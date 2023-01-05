const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");

const express = require('express');
const app = express();
const fs = require("fs")

const multer = require("multer");
const path = require("path");
const upload = multer({ dest: './client/src/assets/profils/' })

//auth 
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

//
router.put("/profil/:id", userController.profil);
//all user databases 
router.get("/", userController.getAllUsers);
// user info
router.get("/:id", userController.userInfo);
//update
router.put("/:id", userController.updateUser);
//delete user 
router.delete("/:id", userController.deleteUser);
//add new user 
router.post("/", userController.create);


//upload 
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
