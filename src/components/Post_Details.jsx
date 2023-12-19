import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import CommentSection from "./CommentSection";
import { getAuth } from "firebase/auth";
import ConvetDateTime from "./ConvetDateTime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post_Details = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    const getsingleDoc = async (id) => {
      const ref = doc(db, "post", id);
      getDoc(ref).then((doc) => setData(doc.data()));
    };
    getsingleDoc(id);

    console.log("single data ", data);
  }, [id]);
const [commnetLength, setcommnetLength] = useState("")
  
console.log(data)

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

      <div className="container my-3 text-center">
        <div className="my-5 detail_page">
          <img src={data.imageUrl} style={{ borderRadius: "5%" }} />
          <div className="my-3">
            <div className="single_user">
              <img src={data.photoUrl} alt="" />
              <h2>{data.name}</h2>
            </div>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
      <div className="container text-center my-5">
        <CommentSection postId={id} setcommnetLength={setcommnetLength} />
      </div>
    </>
  );
};

export default Post_Details;
