import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import axios from "axios"
import { useState, useEffect } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap; // because flex makes them horizontal, flexwrap allows 4 products per line
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => { // cat, filters, and sort are values of Products
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() =>{
    const getProducts = async () => {
      try{
        const res = await axios.get( cat
          ? `http://localhost:5000/api/products?category=${cat}` // if there is a category e.g men, GET the products in that category
          : "http://localhost:5000/api/products" // GET request to get all products from backend (api side where admin adds products/non static)
        )
        setProducts(res.data)
      }
      catch (err) {}
    };
    getProducts()
  }, [cat])


  // Filters products using the filters selected
  useEffect(() => {
    cat &&
      setFilteredProducts (
        products.filter(item =>
          Object.entries(filters).every(([key,value]) =>
            item[key].includes(value)
          )
        )
      )
  }, [products,cat,filters])

  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => a.createdAt - b.createdAt)  
      )
    }
    else if(sort==="asc"){
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => a.price - b.price)  
      )
    }
    else {
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => b.price - a.price)  
      )
    }
  }, [sort]) // sort is a dependency

  return (
    <Container>
        {cat
          ? filteredProducts.map((item) => <Product item={item} key={item.id}/>)
          : products
            .slice(0,8)
            .map((item) => <Product item={item} key={item.id}/>)}
    </Container>
  )
}

export default Products