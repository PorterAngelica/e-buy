import express from "express"
import {addCategory, getCategory} from "../controllers/category.js"

const router = express.Router()

router.post("/addCategory", addCategory)
router.get("/getCategory", getCategory)

export default router