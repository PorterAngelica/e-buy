import express from "express"
import {addCategory, getCategory, getCategoryById} from "../controllers/category.js"

const router = express.Router()

router.post("/addCategory", addCategory)
router.get("/getCategory", getCategory)
router.get("/getCategory/:id", getCategoryById)

export default router