import React, { useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import MetaData from "./MetaData/MetaData"
import "./Home.css"
import { useAlert } from "react-alert";
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Actions/Product'
import Loader from '../Layout/Loader/Loading';

const Home = () => {
  const dispatch = useDispatch()
  const alert = useAlert();

  const { loading, products,  error } = useSelector(state => state.products)


  useEffect(() => {
    dispatch(getAllProducts())


    if (error) {
      alert.error(error)
      dispatch({ type: "CLEAR_ERROR" })
    }


  }, [dispatch, alert, error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce" /><div className='banner'>
            <p>Welcome To Ecommerce Store</p>
            <h1>Find The Amazing Product Below </h1>

            <a href="#container">
              <button>Scroll <CgMouse /></button>
            </a>
          </div><h2 className="homeHeading">Featured Products</h2><div className="container" id="container">
            {products && products.map((product, index) => <ProductCard key={index} product={product} />
            )}
          </div>
        </>
      )
      }
    </>
  )
}

export default Home