import express from "express";

const router = express.Router();

import { signin, signup, createFavorite, getFavorites, namechange, passwordchange } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/:id/favorites", getFavorites);
router.post("/favorited", createFavorite);

router.post("/namechange", namechange);
router.post("/passwordchange", passwordchange);

export default router;