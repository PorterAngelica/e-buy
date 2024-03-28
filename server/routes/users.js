import express from 'express'
import { getUser, updateUser, getUsers } from '../controllers/user.js'

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/getUsers". getUsers)
router.put("/updateUser", updateUser)

export default router;