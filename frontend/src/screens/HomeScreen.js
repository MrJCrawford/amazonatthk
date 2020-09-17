import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';


function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandlerValue = (e) => {
    setSortOrder(e.target.value);
  };
  return (
    <>
      <img className="banner" src="\images\TinyTreasuresBanner.png" alt="banner" />
      <hr/>
      { category.length >1 ? <h2 style={{marginLeft:"0.5em", color:"var(--mainBanner)"}}>{category}</h2> 
                          : <h2 style={{marginLeft:"0.5em", color:"var(--mainBanner)"}}>All Products</h2>}
      <div className="category-buttons">
        <Link to="/">
        <button className="category-button" onClick>All</button>
        </Link>
        <Link to="/category/Montessori">
        <button className="category-button" onClick>Montessori</button>
        </Link>
        <Link to="/category/Pretend Play">
        <button className="category-button" onClick>Pretend Play</button>
        </Link>
        <Link to="/category/Learning and Education">
        <button className="category-button" onClick>Learning and Education</button>
        </Link>
        <Link to="/category/Electronics">
        <button className="category-button" onClick>Electronics</button>
        </Link>
        <Link to="/category/Play Vehicles">
        <button className="category-button" onClick>Play Vehicles</button>
        </Link>
        <Link to="/category/Books">
        <button className="category-button" onClick>Books</button>
        </Link>
        <Link to="/category/Other">
        <button className="category-button" onClick>Other</button>
        </Link>
      </div>
      
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              className="SearchBar"
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          <select name="sortOrder" onChange={sortHandlerValue}>
            <option value="">Default</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
          <button onClick={sortHandler}>Sort</button>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
