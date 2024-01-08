import { Link } from 'react-router-dom'
// import { useRecoilState } from 'recoil';
// import { type as ti} from '../store/atoms';

//icons
import '../static/css/footer.scss';

//logo image
import logo from '../static/images/2.png';

function Footer() {

    // const [type, setType] = useRecoilState(ti);


    return (
        <footer className="footersection">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 offset-lg-2 col-sm-4 offset-sm-2">
                        <div className="logopicdiv"><img src={logo} alt="logo" className="img-fluid logopic"></img></div>
                    </div>
                    <div className="col-lg-2 offset-lg-0 col-sm-4 offset-sm-0 list">

                        <h2>User</h2>
                        <ul >
                            <li>
                                <Link to='/'>Verify</Link>
                            </li>
                            <li>
                                <Link to='/buy'>Buy</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="col-lg-2 offset-lg-0 col-sm-4 offset-sm-2 list">

                        <h2>Owner</h2>
                        <ul >
                            <li>
                                <Link to="/add">
                                    Add Product
                                </Link>
                            </li>
                            <li>
                            <Link to="/products">
                                    Product List
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 offset-lg-0 col-sm-4 offset-sm-0  list">

                        <h2>Technology Used</h2>
                        <ul>
                            <li>
                                <a href='https://docs.soliditylang.org/en/v0.8.22/'> Solidity</a>
                            </li>
                            <li>
                            <a href='https://trufflesuite.com/docs/truffle/how-to/install/'> Truffle</a>
                            </li>
                            <li>
                            <a href='https://trufflesuite.com/ganache/'> Ganache</a>
                            </li>
                            <li>
                            <a href='https://react.dev/'> React JS</a>
                            </li>
                        </ul>

                        {/* <h2>Seller</h2>
                        <ul >
                            <li>
                                <Link to="/sell">Sell</Link>
                            </li>
                            <li>
                                
                                <Link to="/addowner">
                                    Transfer Owner
                                </Link>
                            </li>
                            <li>
                                <Link to="/registerSeller">
                                    Register Seller
                                </Link>
                            </li>
                            <li>
                                <Link to="/side">
                                   Side
                                </Link>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>
            <div className="copyrights">
                <Link to="/">@2023 Copyright AuthDApp</Link>
            </div>
        </footer>
    )

}

export default Footer;