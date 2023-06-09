import { useState ,useEffect} from "react";
import styles from "./Home.module.css";
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import Block from '../Contract/artifacts/contracts/Block.sol/Block.json';
import Web3 from 'web3/dist/web3.min.js';
import 'firebase/compat/database';
import {db,storage,auth} from '../firebase'; 
import {uploadBytes,ref,getDownloadURL} from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

let file1 = null;
let cid1 = null;
let hashval = null;
function App(){
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const { ethereum } = window;
  const [walletAddress, setWalletAddress] = useState("");
  const [presentUser,setPresentUser]=useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
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
  // const delay = ms => new Promise(
  //   resolve => setTimeout(resolve, ms)
  // );
  const handleImageChange = async(e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    // await delay(5000);
    file1 = e.target.files[0];
    handleUpload(e.target.files[0]);
  };
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    // console.log(image);
    reader.onloadend = () => {
      const imageData = new Uint8Array(reader.result);
      const hash = crypto.subtle.digest('SHA-256', imageData);
      hash.then((result) => {
        const hexCodes = [];
        const view = new DataView(result);
        for (let i = 0; i < view.byteLength; i += 4) {
          const value = view.getUint32(i);
          const hex = value.toString(16);
          hexCodes.push(hex.padStart(8, '0'));
        }
        const finval = hexCodes.join(''); 
        // console.log(typeof finval);
        hashval = finval;
        checkIfImageExists(file,finval);
    });
  };
};
  const checkIfImageExists = (file,finval) => {
    const databaseRef = firebase.database().ref('images');
    // console.log(file);
    databaseRef.once('value') 
    .then((snapshot) => {
      const images = snapshot.val();
      if (images) {
        const keys = Object.keys(images);
        for (let i = 0; i < keys.length; i++) {
          // console.log(keys[i].hash);
          if (images[keys[i]].hash === finval) {
            alert("Image already exists in our Database");
            return;
          }
        }
      }
      // console.log(finval);
      // databaseRef.push({hash: finval});
      alert("Successfully Verified");
      FinalUpload();
    })
    .catch((error) => 
    {
      console.error(error);
    });
  };
  const fbupload = async(file1)=>
  {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const iid = accounts[0];
    const userId = presentUser.uid;
    const storageRef = ref(storage, `images/${userId}/${file1.name}`);
    await uploadBytes(storageRef, file1);
    const downloadURL = await getDownloadURL(storageRef);
    const imageRef = await addDoc(collection(db, "images"), {
      uid: userId,
      pid: iid,
      fileName: file1.name,
      downloadURL,
      createdAt: serverTimestamp(),
      ipfs : `ipfs.io/ipfs/${cid1}`
    });
    console.log("Image uploaded successfully with ID: ", imageRef.id);
  };
  async function FinalUpload()
  {
    const contractAddress = "";
    const abi = Block.abi;
    // const contract = new Contract(contractAddress, abi, provider);
    if(window.ethereum){
			var accounts=await ethereum.request({method :'eth_requestAccounts'});
			
			var web3 = new Web3(window.ethereum);
			var contract = new web3.eth.Contract(abi,contractAddress);
			// console.log("CONTRACT IS",contract);

      // var walletAddress= "0x3b83abF1D3e13c9Fb8223BA0a4B5c37CCe6b537b";
			const result=await contract.methods.pay().send({ from:accounts[0] });
			console.log(result);

      console.log(result.transactionHash);
      if(result.transactionHash!=null)
        alert('Transaction Successfully Completed!');
      
      const fhash = result.transactionHash;
      IPFSupload(fhash);
    }
    async function IPFSupload(fhash)
    {
      const client = "";
      const data =  fhash;
      const headers = {
        Authorization: `Bearer ${client}`,
        'Content-Type': 'application/json'
      };
      const body = JSON.stringify({ data });
      let fin ="";
      try {
        const response = await fetch('https://api.web3.storage/upload', {
          method: 'POST',
          headers,
          body
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { cid } = await response.json();
        fin = cid;
        cid1 = cid;
        console.log(`Data uploaded to ${cid}!`);
      }
      catch (error) {
        console.error(error);
      }
      fbupload(file1);
      const databaseRef = firebase.database().ref('images');
      databaseRef.push({hash:hashval});
      alert(`ipfs.io/ipfs/${fin}`);
      
    }
    
  }
  return(
    // <div style={{ backgroundImage:`url(${Background})`,backgroundRepeat:"no-repeat",backgroundSize:"contain", height:1500,width:1500}}>
      <div className="main">
      <div className={styles.container}>
      <div className={styles.innerBox}>
          <h1>Copyright Your Image</h1>
              <h3 align="center">Upload Your Image</h3>
              <input type="file" align={"center"} accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />
              <img src = {image} alt="" style={{ display: "block", margin: "0 auto", width: "300px", height: "auto" }}></img>
        </div>
        </div>
        </div>
  );
}    

export default App;
