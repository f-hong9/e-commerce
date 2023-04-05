import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap; // because flex makes them horizontal, flexwrap allows 4 products per line
    justify-content: space-between;
`

const Products = () => {
  return (
    <Container>
        {popularProducts.map((item) => (
            <Product item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Products