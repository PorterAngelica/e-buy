import { db } from "../connect.js"

export const addProduct = (req, res) => {
    const q = "INSERT INTO `ebuy_schema`.products (`name`,`price`,`image`,`description`, `category`,`users_id`) VALUE (?)"

    const values = [
        req.body.name,
        req.body.price,
        req.body.image,
        req.body.description,
        req.body.category,
        req.body.users_id,
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Product has been added")
    });
}

export const getProducts = (req, res) => {

    const q = "SELECT * FROM `ebuy_schema`.products"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })

}

export const getProduct = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM `ebuy_schema`.products  WHERE id=?"
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const productsBuyed = (req, res) => {
    const q = "INSERT INTO ebuy_schema.products_buyed (`quantity`,`products_id`) VALUE (?)"
    const values = [
        req.body.quantity,
        req.body.products_id
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const shoppingCart = (req,res) => {

    const q =`SELECT p.name, p.price, p.description, p.image, p.category, pb.quantity, pb.id
    FROM products p
    JOIN ebuy_schema.products_buyed pb ON p.id = pb.products_id
    `

    const productsId = [ req.body.productsId]

    db.query(q, [productsId],(err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    } )
}

export const destroy = (req, res) => {
    const q = "delete from ebuy_schema.products_buyed where id=?"

    db.query(q,[req.params.id], (err,data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    } )
}