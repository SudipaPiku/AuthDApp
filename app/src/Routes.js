import { lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Toast from './Toast.js'
import { login as ll } from './store/atoms'
import { useRecoilValue } from 'recoil'
const Home = lazy(() => import(/* webpackChunkName: "HOME" */ './pages/home'))
const Login = lazy(() => import(/*webpackChunkName: "LOGIN" */ './pages/login'))
const Info = lazy(() => import(/*webpackChunkName: "INFO" */ './pages/info'))
const BuyProduct = lazy(() => import(/*webpackChunkName: "BUYPRODUCT" */ './pages/buyProduct'))
const AddProduct = lazy(() => import(/*webpackChunkName: "ADD" */ './pages/add'))
const Products = lazy(() => import('./pages/products'))
const ProductInfo = lazy(() => import('./pages/productInfo'))
const Scan = lazy(() => import('./pages/scan'))
const QRCode = lazy(() => import('./pages/qrcode'))
const addproductEr = lazy(() => import('./ProductsAll/addProductError.js'))
const BuyProductError = lazy(()=> import('./ProductsAll/buyProductError.js'))

function Routes() {

  return (
    <>
      <Router>
        <Route component={Header} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/scan" exact component={Scan} />
          <Route path='/qrcode' component={QRCode} />
          <Route path='/login' component={Login} />
          <Route path='/BuyProductError' component={BuyProductError}/>
          <Route path="/addproductEr" component={addproductEr} />

          <PrivateRoute path="/product/:id" >
            <Info />
          </PrivateRoute>
          
          <PrivateRoute path='/buy' exact >
            <BuyProduct />
          </PrivateRoute>
          <PrivateRoute path='/productinfo/:id' >
            <ProductInfo />
          </PrivateRoute>

          <PrivateRoute path='/add' >
            <AddProduct />
          </PrivateRoute>
          <PrivateRoute path='/products' >
            <Products />
          </PrivateRoute>
        </Switch>
        <Route component={Footer} />
      </Router>
      <Toast />
    </>
  );
}
function PrivateRoute({ children, ...rest }) {
  const login = useRecoilValue(ll)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        login
          ? children
          : <Redirect to={{ pathname: '/login', state: { from: location } }} />

      }
    />
  );
}
export default Routes;
