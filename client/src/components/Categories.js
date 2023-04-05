import styled from "styled-components"
import { categories } from "../data"
import CategoryItem from './CategoryItem'
import {mobile} from "../responsive"


const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({padding: "0px", flexDirection:"column"})}
`

const Categories = () => {
  return (
    <Container>
        {/* Pass each item in data.js into CategoryItem as a prop
            and CategoryItem outputs each item's info (img, title)*/}
        {categories.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Categories