import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add_Post = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      await uploadTask;

      const url = await getDownloadURL(uploadTask.snapshot.ref);
      // setImageUrl(url);

      const Data = {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        userId: auth.currentUser.uid,
        photoUrl:auth.currentUser.photoURL,
        imageUrl: url,
        title,
        description,
        time: serverTimestamp(),
      };

      const userDocRef = await addDoc(collection(db, "post"), Data);

       toast.success("Post Added Successfully..!", {
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
       });

      console.log("Image uploaded and user data stored successfully!");
      console.log("User document ID:", userDocRef.id);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }

    setDescription("");
    setTitle("");
    setImage("");

    navigate("/");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="container my-5 add_post">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Img
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChange}
              required
            />
            {/* <button onClick={handleUpload}>Upload</button> */}
            {/* {imageUrl && (
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
          )} */}
          </div>
          <button type="submit" className="btn btn-primary">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Add_Post;
