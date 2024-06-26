import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { filterProductAction, getAllCategoryAPI, getAllProductAPI, getProductByCategoryAPI, getProductByKeywordAPI } from "../../redux/reducers/ProductReducer/productReducer";
import ShoeCard from "../../components/ShoeCard/ShoeCard";
import _ from 'lodash';
import { STRING } from "../../assets/String";
const Search = () => {
  
  const [values, setValues] = useState({
    keyword: ''
  })
  const [searchParam, setSearchParam] = useSearchParams()
  const [categoryID, setCategoryID] = useState(null)
  const { arrProduct, arrCategory } = useSelector(state => state.productReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let keyword = searchParam.get('keyword');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [ name ]: value
    });
  }

  const handleSearch = (e) => {
    e?.preventDefault();
    setSearchParam({keyword: values.keyword})
  }

  const getProductByKeyword = (keyword) => {
    if(keyword) {
      setCategoryID(null)
      removeClassActive();
      const actionKeyword = getProductByKeywordAPI(keyword);
      dispatch(actionKeyword);
    }
  }

  useEffect(() => {
    getProductByKeyword(keyword);
  }, [keyword])

  const getAllCategory = () => {
    const actionCategory = getAllCategoryAPI();
    dispatch(actionCategory)
  }

  const getAllProduct = () => {
    navigate('/search')
    removeClassActive();
    const actionProduct = getAllProductAPI();
    dispatch(actionProduct)
  }

  useEffect(() => {
    getAllCategory();
    if(!keyword){
      getAllProduct();
    }
  }, [])

  const getProductByCategory = (id) => {
    const actionCategoryID = getProductByCategoryAPI(id);
    dispatch(actionCategoryID)
  }

  useEffect(() => {
    if(categoryID) {
      getProductByCategory(categoryID);
    }
  },[categoryID]);

  const handleCategoryClick = (item, i) => {
    const li = document.querySelectorAll(".category");
    setCategoryID(item);
    navigate("/search")
    removeClassActive();
    li[i].classList.toggle("active");
    
  }

  const removeClassActive = async () => {
      const li = document.querySelectorAll(".category");
      for(let item of li) {
        item.className = 'category';
      }
  }

  const handleChangeSelect = (e) => {
    const {value} = e.target;
    if(value === 'low-high'){
      const lowHigh = _.sortBy(arrProduct, ['price']);
      const action = filterProductAction(lowHigh);
      dispatch(action)
    } else if (value === 'high-low'){
      const highLow = _.orderBy(arrProduct,['price'],['desc']);
      const action = filterProductAction(highLow);
      dispatch(action)
    } else {
      getAllProduct();
    }
  }

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="form__input">
            <input type="text" name="keyword" required onChange={handleChange}/>
            <span>Product name</span>
          </div>
          <button type="submit" onClick={handleSearch}>Search</button>
        </form>
        <div className="search__content">
          <div className="search__category">
              <h1 onClick={getAllProduct}>Category</h1>
              <div className="category__list">
                <ul id="categoryList">
                  {arrCategory?.map((item, i) => {
                    return <li className="category" key={i} onClick={() => {
                      handleCategoryClick(item.id, i)
                    }}>
                      <img src="../img/shoe3.jpg" alt="shoe"/>
                      <a>{item.category}</a>
                    </li>
                  })}
                </ul>
              </div>
          </div>
          <div className="search__result">
            <div className="title">
              <h1>Search result</h1>
              <div className="search__filter">
                {keyword && <span>Search results for '{keyword}'({arrProduct?.length})</span>}
                <div className="filter__content">
                  <i className="fa-solid fa-filter"></i>
                  <span>Filter price by: </span>
                  <div className="search__option">
                    <select type='select' id="select" onChange={handleChangeSelect}>
                      <option value='default' name='default'>Select an option</option>
                      <option value="low-high" name='low-high'>Low to high</option>
                      <option value="high-low" name='high-low'>High to low</option>
                    </select>
                    <i className="fa-solid fa-sort-down"></i>
                  </div>
                </div>
              </div>
              <div className="product__result">
                <div className="result__content row">
                  {arrProduct?.map((prod, i) => {
                    return <div className="result__item col-12 col-sm-6 col-xl-4" key={i}>
                      <div className="result__card">
                        <ShoeCard prod={prod}/>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
