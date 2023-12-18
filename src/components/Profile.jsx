import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import BlogPost from "./BlogPost";

const Profile = () => {
  const auth = getAuth();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const commentsQuery = query(
      collection(db, "post"),
      orderBy("time", "desc")
    );
    const getdata = async () => {
      onSnapshot(commentsQuery, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };

    getdata();
    console.log("All posts ", posts);
  }, []);

  return (
    <>
      <div className="container my-5 text-center">
        <img
          style={{
            borderRadius: "100%",
          }}
          src={auth?.currentUser.photoURL}
          alt=""
        />
        <h1>{auth?.currentUser.displayName}</h1>
        <h3>{auth?.currentUser.email}</h3>
        {/* <h2>{auth.currentUser.metadata.creationTime}</h2> */}
        <h3>Last login :- {auth?.currentUser.metadata.lastSignInTime}</h3>
      </div>
      <div className="container">
        {posts
          .filter((post) => post.userId == auth.currentUser.uid)
          .map((p) => (
            <BlogPost key={p.uid} p={p} />
          ))}
      </div>
    </>
  );
};

export default Profile;
