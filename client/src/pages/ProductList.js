import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import {mobile} from "../responsive"
import {useLocation} from "react-router-dom"
import { useState } from "react";

const Container = styled.div`

`

const Title = styled.h1`
    margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    margin: 20px;
    ${mobile({margin: "0px 20px", display: "flex", flexDirection: "column"})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px
    ${mobile({marginRight: "0px"})}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: "10px 0px"})}
`

const Option = styled.option``

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];

    const [filters, setFilters] = useState({}) // array b/c multiple filters
    const [sort, setSort] = useState("newest")

    // Gets selected filter
    const handleFilters = (e) => {
        const value = e.target.value; 
        setFilters({
            ...filters,             // no selected filter ; if multiple filters, concate them
            [e.target.name]: value // set 'filter' to the selected filter
        })
    }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange = {handleFilters}>
                    <Option disabled>
                        Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                </Select>
                <Select name="size" onChange = {handleFilters}>
                    <Option disabled>
                        Size
                    </Option>
                    <Option>8</Option>
                    <Option>9</Option>
                    <Option>10</Option>
                    <Option>11</Option>
                    <Option>12</Option>
                    <Option>13</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={e => setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        {/* list products with selected category , filter and sort */}
        <Products cat={cat} filters={filters} sort={sort}/> 
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default ProductList