import { useSetRecoilState, useRecoilState } from "recoil";
import { Formik, Form as Fm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { BiScan } from "react-icons/bi";
import "../static/css/login.scss";
import { Link } from "react-router-dom";
import Loader from "../components/loader";
import provider from "../store/web3Provider";
import { useHistory } from "react-router-dom";

import { popups, secretId as si } from "../store/atoms";

export default function BuyProduct() {
  const setPopup = useSetRecoilState(popups);
  const [secretId, setSecretId] = useRecoilState(si);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const schema = yup.object({
    secretId: yup.string().required("Required!").max(30),
  });

  const initialValues = {
    secretId: secretId,
  };


  async function buyProduct(values) {
      try {
          setLoading(true)

          const response = await provider.sendTransaction('buyProduct',[values.secretId],true)
          console.log(response);
          if (response === 'no') {
            setLoading(false);
            setPopup(`This product is fake or does not exist. `);
            history.push('/BuyProductError')
              
          } else {
            setSecretId('')
            setLoading(false);
            setPopup(`Product bought successfully`)
          }
      }
      catch (error) {
          setPopup("Product is Fake")
          console.log(error.message) 
      }
      // finally{
      //     setLoading(false)
      // }
  }

  return (
    <section>
      <div className="containerS">
        <div className="frame">
          {loading ? (
            <Loader size="normal" />
          ) : (
            <div>
              <div className="nav">
                <ul className="links">
                  <li className="signin-active">
                    <a className="btn">Enter Product ID</a>
                  </li>
                </ul>
              </div>
              <div className="formParent">
                <Formik
                  validationSchema={schema}
                  onSubmit={buyProduct}
                  initialValues={initialValues}
                >
                  <Fm className="form-signin" name="form">
                    <Form.Row>
                      <Form.Group as={Col} controlId="1">
                        <Form.Label>Product ID</Form.Label>
                        <div className="d-flex">
                          <Field
                            tabIndex="1"
                            type="text"
                            placeholder="Product ID"
                            name="secretId"
                            className="form-styling"
                          />

                          {/* <Link
                            to={{
                              pathname: "/scan",
                              query: {
                                returnAddress: "/buy",
                                value: "secretId",
                              },
                            }}
                          >
                            <BiScan size={35} color="white" />
                          </Link> */}
                        </div>
                        <ErrorMessage name="secretId" />
                      </Form.Group>
                    </Form.Row>

                    <Button
                      className="btn btn-signup"
                      tabIndex="4"
                      type="submit"
                    >
                      Buy
                    </Button>
                  </Fm>
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
