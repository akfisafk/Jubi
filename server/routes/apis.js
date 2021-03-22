import express from 'express';

const router = express.Router();

import { popular, toprated, horror, nowplaying, search, getRecommended } from "../controllers/apis.js";

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

router.get("/popular", popular);
router.get("/toprated", toprated);
router.get("/horror", horror);
router.get("/nowplaying", nowplaying);
router.post("/search", search)
router.post("/recommended", getRecommended)

export default router;