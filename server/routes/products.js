import express from "express"
import { addProduct, getProducts, getProduct, productsBuyed, shoppingCart, deleteFromCart, deleteProduct, updateProduct } from "../controllers/product.js"

const router = express.Router();

router.post("/addProduct", addProduct)
router.get("/getProducts", getProducts)
router.get("/getProduct/:id", getProduct)
router.post("/products/buyed", productsBuyed)
router.get("/shoppingCart", shoppingCart)
router.delete("/:id", deleteFromCart)
router.delete("/deleteProduct/:id", deleteProduct)
router.put("/editProduct/:id", updateProduct)

export default router;