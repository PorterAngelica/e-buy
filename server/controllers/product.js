import {db} from "../connect.js"

export const addProduct = (req,res) => {
    const q = "INSERT INTO `e-buy_schema`.products (`name`,`price`,`image`,`description`,`users_id`) VALUE (?)"

    const values = [
        req.body.name,
        req.body.price,
        req.body.image,
        req.body.description,
        req.body.users_id,
    ]
    db.query(q, [values], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Product has been added")
    });
}

export const getProducts = (req, res) => {

    const q = "SELECT * FROM `e-buy_schema`.products"

    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })

}