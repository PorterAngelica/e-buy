import express from 'express'
import { getUser, updateUser, getUsers } from '../controllers/user.js'

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/updateUser", updateUser)
router.get("/getUsers", getUsers)

export default router;