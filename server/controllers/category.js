import {db} from "../connect.js"

export const addCategory = (req, res) => {
    const q = "INSERT INTO `ebuy_schema`.category (`name`) VALUE (?)";

    const values = [
        req.body.name
    ]

    db.query(q, [values], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Category added")
    });
};

export const getCategory = (req, res) => {
    const q = "SELECT * FROM `ebuy_schema`.category"

    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    });
}