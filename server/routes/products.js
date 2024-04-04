import express from "express"
import { addProduct, getProducts, getProduct, productsBuyed, shoppingCart } from "../controllers/product.js"

const router = express.Router();

router.post("/addProduct", addProduct)
router.get("/getProducts", getProducts)
router.get("/getProduct/:id", getProduct)
router.post("/products/buyed", productsBuyed)
router.get("/shoppingCart", shoppingCart)

export default router;