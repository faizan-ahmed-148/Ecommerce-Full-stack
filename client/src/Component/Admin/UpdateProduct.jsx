import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../Home/MetaData/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom"
import { getProductDetails, updateProduct } from "../../Actions/Product";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams()
 
    const { product, error } = useSelector(state => state.productDetails);
   
    const { loading, error: updateError, message } = useSelector(state => state.product);

    const productId = params.id;
    useEffect(() => {
        
           
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERROR" })
        }
    
          if (updateError) {
            alert.error(updateError)
            dispatch({ type: "CLEAR_ERROR" })
          }
    
          if (message) {
              alert.success(message);
              dispatch({ type: "CLEAR_MESSAGE" })
            }

            dispatch(getProductDetails(productId));
        
        }, [
        dispatch,
        alert,
        error,
        updateError,
        message,
        productId,
       
     
    ]);

    const [name, setName] = React.useState(product && product.name);
    const [price, setPrice] = React.useState(product && product.price);
    const [description, setDescription] = React.useState(product && product.description);
    const [category, setCategory] = React.useState(product && product.category);
    const [Stock, setStock] = React.useState(product && product.Stock);
    const [images, setImages] = React.useState([]);
    const [oldImages, setOldImages] = React.useState(product && product.images);
    const [imagesPreview, setImagesPreview] = React.useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];


    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct(productId, name,price,description, category,Stock,images));
       
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                                required
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;