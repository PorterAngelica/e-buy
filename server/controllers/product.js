import { db } from "../connect.js"

export const addProduct = (req, res) => {
    const {name, price, image, description} = req.body;

    if(!name || !price || !image || !description){
        return res.status(400).json({general:"All fields are required"})
    }
    const q = "INSERT INTO `ebuy_schema`.products (`name`,`price`,`image`,`description`,`category_id`,`users_id`) VALUE (?)"

    const values = [
        req.body.name,
        req.body.price,
        req.body.image,
        req.body.description,
        req.body.category_id,
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
export const getProductFromSeller = (req, res) => {

    const q = "SELECT * FROM `ebuy_schema`.products WHERE users_id=?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })

}

export const getProduct = (req, res) => {
    const id = req.params.id;
    const q = `    SELECT u.brand_name, u.brand_description, p.id, p.name, p.price, p.image, p.description, c.name AS category_name
    FROM ebuy_schema.products p
    JOIN ebuy_schema.users u
    ON u.id = p.users_id
	JOIN ebuy_schema.category c
    ON c.id = p.category_id
    where p.id=?`
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

    const q =`SELECT p.name, p.price, p.description, p.image, pb.quantity, pb.id
    FROM products p
    JOIN ebuy_schema.products_buyed pb ON p.id = pb.products_id
    `

    const productsId = [ req.body.productsId]

    db.query(q, [productsId],(err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    } )
}

export const deleteFromCart = (req, res) => {
    const q = "delete from ebuy_schema.products_buyed where id=?"

    db.query(q,[req.params.id], (err,data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    } )
}

export const deleteProduct = (req, res) => {
    const q ="DELETE from ebuy_schema.products WHERE id=?";

    db.query(q, [req.params.id], (err,data)=> {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })

}

export const updateProduct = (req, res) => {
    const {name, price, image, description} = req.body;
    if(!name || !price || !image || !description){
        return res.status(400).json({general:"All fields are required"})
    }
    
    const q = "UPDATE `ebuy_schema`.products SET `name`= ?, `price`=  ?, `image`= ?, `description`= ?, `category_id`= ?, `users_id`= ? WHERE id=?";

    db.query(
        q,
        [
            req.body.name,
            req.body.price,
            req.body.image,
            req.body.description,
            req.body.users_id,
            req.body.category_id,
            req.params.id
        ],
        (err,data) =>{
        if(err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
    })
}