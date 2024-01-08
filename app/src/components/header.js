// libraries
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import Loader from './loader';

// css
import '../static/css/header.scss';
import '../static/css/hamMenuAnimation.scss';

// images
import logo from '../static/images/2.png';
import homeIco from '../static/images/nav/home.svg';
import userIco from '../static/images/nav/user.svg';
import vendorIco from '../static/images/nav/vendor.svg';
import provider from '../store/web3Provider';

// global state store
import { popups as pp, login as ll } from '../store/atoms';

function Header() {
    const [open, setOpen] = useState(false);
    const setPopup = useSetRecoilState(pp);
    const [login, setLogin] = useRecoilState(ll);
    const [isFetching, setIsFetching] = useState(true);
    const history = useHistory();

    // function to set ham menu open and close
    function hamOpener() {
        let list = document.querySelector('.nav-items');
        let ham = document.querySelector('.nav-icon');
        ham.classList.toggle('openHam');

        if (!open) {
            list.style.display = 'flex';
        } else {
            list.style.display = 'none';
        }
        setOpen(!open);
    }

    async function Logout() {
        console.log("Logout button clicked");
        try {
            await provider.logout();
            setPopup("Logged you out from Metamask");
            history.replace('/');
            setLogin(false); // Add this line
            console.log("Logout - User is logged out");
        } catch (error) {
            console.log(error.message);
        } 
    }

    async function Login() {
        console.log("Login button clicked");
        try {
            await provider.login();
            setLogin(true);
            setPopup("Logged in successfully");
            console.log("Login - User is logged in");
        } catch (error) {
            console.log(error.message);
            setPopup("Failed to login");
        }
    }

    async function isLoggedin() {
        const response = await provider.isLoggedIn();
        console.log("isLoggedIN ??", response);
        if (response.result === true) {
            setLogin(true);
            console.log("isLoggedin - User is logged in");
        } else {
            setLogin(false);
            console.log("isLoggedin - User is not logged in");
        }
    }

    useEffect(() => {
        async function checkLogin() {
            await provider.setAccount();
            await isLoggedin();
            setIsFetching(false);
        }
        checkLogin();
    }, []);

    return (
        <header>
            <nav className="navbar">
                <div className="NavbarBrand">
                    <div id="logo">
                        <Link to='/'> <img src={logo} className="img-fluid LogoImg" alt="logo" /></Link>
                    </div>
                </div>
                <div className='nav-items mx-auto'>
                    <span className="d-flex">
                        <Link to='/'>
                            <span>
                                <img src={homeIco} alt="home icon" />
                                <h5 className="ml-2">Home</h5>
                            </span>
                        </Link>
                    </span>
                    <span>
                        {isFetching ? (
                            <Loader size="fix" />
                        ) : login ? (
                            <a onClick={Logout}>
                                <span>
                                    <img src={vendorIco} alt="vendor icon" />
                                    <h5 className="ml-2">Logout</h5>
                                </span>
                            </a>
                        ) : (
                            <a onClick={Login}>
                                <span>
                                    <img src={userIco} alt="user icon" />
                                    <h5 className="ml-2"> Login/Signup </h5>
                                </span>
                            </a>
                        )}
                    </span>
                </div>
                <div onClick={hamOpener} id="hamMenu">
                    <div className="nav-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
