import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Loader from '../components/loader';
import { popups } from '../store/atoms';
import provider from '../store/web3Provider';
import '../static/css/products.css';

function Products() {
  const setPopup = useSetRecoilState(popups);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [productList, setProducts] = useState([]);
  const [failMessage, setFailMessage] = useState('');

  useEffect(() => {
    async function getProductList() {
      try {
        setLoading(true);
        // Call the smart contract function to get all products
        const response = await provider.callTransaction('getAllProducts');

        if (response.code) {
          // Handle the case where the smart contract call failed
          console.error(response.message);
          setFailMessage(response.message || 'Failed to fetch products. Please try again.');
        } else {
          // Set the product list in the state
          setProducts(response);
        }
      } catch (error) {
        // Handle unexpected errors
        console.error(error);
        // setPopup(error.message);
      } finally {
        setLoading(false);
      }
    }

    // Call the getProductList function when the component mounts
    getProductList();
  }, []); // The empty dependency array ensures this useEffect runs once on mount

  const productInfo = (productId) => {
    // Navigate to the product info page
    history.push(`/productinfo/${productId}`);
  };

  return (
    <div className="productList">
      <div className="container">
        <h1>Products you own</h1>
        <div className="list-group">
          {loading ? <Loader /> :
            (failMessage ? <div className="text-center">{failMessage}</div> :
              (productList.length === 0 ? <div className="text-center">You don't own any products yet</div> :
                productList.map((product, idx) => (
                  <div className="berber" key={product[0]} onClick={() => { productInfo(product[0]) }}>
                    <div className="berber-image">
                      {(idx + 1)}.
                    </div>
                    <p className="berber-fullname">
                      {product[0]}
                    </p>
                    <p className="berber-dukkan">
                      {product[2]}
                    </p>
                  </div>
                ))
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

Products.propTypes = {
  // Define any expected props if necessary
};

export default Products;
