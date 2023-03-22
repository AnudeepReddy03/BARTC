import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { auth } from "./firebase";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";

import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [presentUser,setPresentUser]=useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();

    auth.onAuthStateChanged((user) => {
      if (user) {
        setPresentUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setPresentUser(null);
      }
    });
  }, [walletAddress]);
  
  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // const l1 = () => {
  //   navigate('/login');
  // };

  // const s1 = () => {
  //   navigate('/signup');
  // };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h3 className="navbar-item">BARTC</h3>
          </div>
          <div className="navbar-menu">

              <div className="navbar-item">
                <button
                  className="button is-white connect-wallet"
                  onClick={connectWallet}
                >
                  <span className="has-text-weight-bold">
                    {walletAddress && walletAddress.length > 0
                      ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                      : "Connect Wallet"}
                  </span>
                </button>
                &nbsp;&nbsp;
                <button
                  className="button is-white connect-wallet"
                  // onClick={()=>navigate("/login")}
                >
                  <span className="has-text-weight-bold">
                   Login
                  </span>
                </button>
                &nbsp;&nbsp;
                <button
                  className="button is-white connect-wallet"
                  // onClick={()=>navigate("/signup")}
                >
                  <span className="has-text-weight-bold">
                   SignUp
                  </span>
                </button>
                &nbsp;&nbsp;
                <button
                  className="button is-white connect-wallet"
                  // onClick={}
                >
                  <span className="has-text-weight-bold">
                   My Arts
                  </span>
                </button>
                {/* <div className="nav-item float-end">
                 <div className="collapse navbar-collapse">
                 </div>
                </div> */}
            </div>
          </div>
        </div>
      </nav>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
            <ul className="navbar-nav">
            <li><h5><Link to="/" className="nav-item nav-link btn btn-dark">Home</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/home" className="nav-item nav-link btn btn-dark">Login</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/signup" className="nav-item nav-link btn btn-dark">Sign up</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </ul>
          </Router>
      </div>
    </div>
  );
}

export default App;
