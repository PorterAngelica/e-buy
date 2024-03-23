import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
const app = express()

import authRoutes from "./routes/auth.js"
import categoryRoutes from "./routes/categories.js"
import productRoutes from "./routes/products.js"
import multer from "multer"

//MIDDLEWARE
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/uploads')
        
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage});

app.post("/api/upload", upload.single("file"), (req,res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)

app.listen(8800, () =>{
console.log("backend fire up in port 8800")
})