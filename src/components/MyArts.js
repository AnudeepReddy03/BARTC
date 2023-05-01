import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage,auth } from "../firebase";

function MyArts(props) {
  const [images, setImages] = useState([]);
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
  }, []);
  useEffect(() => {
    const fetchImages = async () => {
      if (!presentUser) return;
      const q = query(
        collection(db, "images"),
        where("uid", "==", presentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      const images = await Promise.all(
        docs.map(async (doc) => {
          const downloadURL = await getDownloadURL(
            ref(storage, doc.data().downloadURL)
          );
          return { id: doc.id, downloadURL: downloadURL, createdAt: doc.data().createdAt,pid: doc.data().pid, };
        })
      );

      setImages(images);
    };

    fetchImages();
  }, [presentUser]);

  // return (
  //   <div>
  //     <h2>My Arts</h2>
  //     {images.map((image) => (
  //       <div key={image.id}>
  //         <img src={image.downloadURL} alt="uploaded art" width="200" height="200" />
  //         <p>Uploaded at: {image.createdAt.toDate().toLocaleString()}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
      
  return (
    <div className="text-center" style={{ backgroundImage: `url(${""})`, backgroundSize: 'cover' }}>
      <br></br>
      <h3>My Arts</h3>
      <br></br>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
          <th style={{ border: "1px solid black", padding: "5px" }}>Image</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Created At</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Public ID</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
             <td style={{ border: "1px solid black", padding: "5px" }}>
                <img src={image.downloadURL} alt="uploaded art" width="200" height="200" />
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{image.createdAt.toDate().toLocaleString()}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{image.pid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyArts;
