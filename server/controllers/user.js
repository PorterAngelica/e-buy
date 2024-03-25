import {db} from "../connect.js"
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM `e-buy_schema`.users WHERE id=?"

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

        const q =
            "UPDATE `e-buy_schema`.users SET `brand_name`=?,`brand_description`=?  WHERE id=? ";

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