import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { auth } from "./firebase";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import "./App.css";
import MyArts from "./components/MyArts";

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
  
  
  // const connectWallet = async () => {
  //   if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       setWalletAddress(accounts[0]);
  //       console.log(accounts[0]);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     alert("Please install MetaMask");
  //   }
  // };

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
  const logout = ()=>
  {
    setPresentUser(null);
    // window.location.reload();
  }

  // const l1 = () => {
  //   navigate('/login');
  // };

  // const s1 = () => {
  //   navigate('/signup');
  // };

  return (
    <Router>
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h3 className="navbar-item">BARTC</h3>
          </div>
          <div className="navbar-menu">

              {/* <div className="navbar-item">
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
              </div> */}
              <div style={{color:"aliceblue"}}>
                {
                  (presentUser)?(presentUser.email):("Please Login")
                }
              </div>
              {
              (presentUser)?(
                <>
                <div>
                <Link to="/login" className="nav-item nav-link btn btn-dark mx-2" onClick={logout}>Logout</Link>
                </div>
                <div>
                <Link to="/myarts" className="nav-item nav-link btn btn-dark mx-2">My Arts</Link>
              </div>
              </>
              ):(
                <>
              <div>
              <Link to="/login" className="nav-item nav-link btn btn-dark mx-2">Login</Link>
              </div>
              <div>
              <Link to="/signup" className="nav-item nav-link btn btn-dark mx-2">Sign up</Link>
              </div>
              </>
              )
              } 
              {/* {
              (presentUser) &&
              <div>
                <Link to="/myarts" className="nav-item nav-link btn btn-dark">My Arts</Link>
              </div>
              } */}

          </div>
        </div>
      </nav>
      <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<Home presentUser={presentUser}/>}/>
            <Route path="/myarts" element={<MyArts presentUser={presentUser} />} />
          </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
