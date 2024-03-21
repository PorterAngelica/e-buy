import React from 'react'
import "./item.css"
//add item

const Item = () => {
    return (
        <div className="container">
            <h1>Add product</h1>
            <form action="">

                <div>
                    <label>Name:</label>
                    <input type="text" name="" id="" />
                </div>

                <div>
                    <label>Price:</label>
                    <input type="number" name="" id="" />
                </div>

                <div>
                    <label>Category:</label>
                    <input type="text" name="" id="" />
                </div>

                <div>
                    <label>Image:</label>
                    <input type="file" name="" id="" />
                </div>

                <div>
                    <label>Description:</label>
                    <input type="text" name="" id="" />
                </div>
                
                <button>Add product</button>

            </form>
        </div>
    )
}

export default Item
