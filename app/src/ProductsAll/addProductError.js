import React from 'react';
import '../static/css/info.scss';

function addProductError() {
    return (
            <div className="container CI my-4">
                <div className="d-flex small">
                    <div className="center">
                        
                            <div className="product-details">
                                <h2>You are not the owner of this smart contract !!!</h2>
                            </div>
                    </div>
                </div>
            </div>
        );
   
}

export default addProductError;
