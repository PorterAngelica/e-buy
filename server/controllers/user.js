import { query } from "express";
import {db} from "../connect.js"
import jwt from "jsonwebtoken";


export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM `ebuy_schema`.users WHERE id=?"

    db.query(q, [userId], (err,data) =>  {
        if (err) return res.status(500).json(err)
        if(data.length ===0) {
            return res.status(404).json({message:"user not found"})
        }
        const {passsword, ...others} = data[0];
        return res.status(200).json(others)
    });
}

export const updateUser = (req,res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const {first_name, last_name, email, password, brand_name, brand_description} = req.body;

        if(!first_name || !last_name || !email || !brand_name || !brand_description){
            return res.status(400).json({general: "All fields are required"})
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({email: "Invalid email format"})
        }
        const q =
        "UPDATE `ebuy_schema`.users SET `first_name`=?, `last_name`=?, `email`=?, `brand_name`=?,`brand_description`=?  WHERE id=? ";

        db.query(
            q,
            [
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                req.body.brand_name,
                req.body.brand_description,
                userInfo.id,
            ],
            (err, data) => {
                if (err) res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            }
        );
    });
};
export const updateBrand = (req,res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");



        const q =
        "UPDATE `ebuy_schema`.users SET  `brand_name`=?,`brand_description`=?  WHERE id=? ";

        db.query(
            q,
            [
                req.body.brand_name,
                req.body.brand_description,
                userInfo.id,
            ],
            (err, data) => {
                if (err) res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            }
        );
    });
};

export const getUsers = (req, res) => {
    const q = "SELECT * FROM `ebuy_schema`.users"

    db.query(q, (err,data) => {
        if(err) res.status(500).json(err)
        return res.status(200).json(data)
    })
}