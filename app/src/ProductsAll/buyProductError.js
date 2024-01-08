import React from 'react';
import '../static/css/info.scss';

function BuyProductError() {
    return (
            <div className="container CI my-4">
                <div className="d-flex small">
                    <div className="center">
                            <div className="product-details">
                                <h2>This product is fake or does not exist..Please Check the Product ID..!!</h2>
                            </div>
                    </div>
                </div>
            </div>
        );
   
}

export default BuyProductError;
