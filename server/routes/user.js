import express from "express";

const router = express.Router();

import { signin, signup, createFavorite, getFavorites, namechange, passwordchange, guest } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/guest", guest);

router.get("/:id/favorites", getFavorites);
router.post("/favorited", createFavorite);

router.post("/namechange", namechange);
router.post("/passwordchange", passwordchange);

export default router;