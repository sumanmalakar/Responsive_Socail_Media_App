// BlogPost.js
import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import ConvetDateTime from "./ConvetDateTime";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

const BlogPost = ({ p }) => {
  const auth = getAuth();
  const location = useLocation();

  const deletBlog = async (id) => {
    alert("Document will deleted forever..!");
    const deleteData = doc(db, "post", id);
    await deleteDoc(deleteData);
  };

  return (
    <div
      className="container text-center posts my-5  "
     
    >
      <div className="user_post my-3">
        <img src={p.photoUrl} alt="" />
        <h2>{p.name}</h2>
      </div>
      <div
        className="card mb-3 post_card"
      
      >
        <div className="row g-0 bg-secondary d-flex justify-content-center align-items-center row_height text-center">
          <div className="col-md-4 d-flex justify-content-center align-items-center img_post">
            <img src={p.imageUrl} alt="..." />
          </div>
          <div className="col-md-8 text-center">
            <div className="card-body  text-light">
              <h5 className="card-title">{p.title}</h5>
              <p className="card-text">{p.description}</p>
              <p className="card-text">
                <ConvetDateTime
                  seconds={p.time.seconds}
                  nanoseconds={p.time.nanoseconds}
                />
              </p>
            </div>
            {/* <button className="btn btn-primary mx-3">
              <h5>
                {" "}
                <AiFillLike /> Like 
              </h5>
            </button> */}
            {/* {location.pathname != "/profile" && ( */}

            <Link to={`/post/${p.id}`} className="btn btn-info mx-3 ">
              <h6 className="tex-light">
                <FaComment style={{ color: "white" }} /> Add Comment
              </h6>
            </Link>

            {/* )} */}
            <Link to={`/post/${p.id}`} className="btn btn-warning mx-3">
              View More
            </Link>
            {location.pathname == "/profile" && (
              <button
                onClick={() => deletBlog(p.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
