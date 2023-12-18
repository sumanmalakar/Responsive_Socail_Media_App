// FileInput.js
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase.config";

const FileInput = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      await uploadTask;

      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setImageUrl(url);

      const userData = {
        name: "John Doe",
        email: "john@example.com",
        imageUrl
      };

      const userDocRef = await addDoc(collection(db, "users"), userData);

      console.log("Image uploaded and user data stored successfully!");
      console.log("User document ID:", userDocRef.id);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
      )}
    </div>
  );
};

export default FileInput;
