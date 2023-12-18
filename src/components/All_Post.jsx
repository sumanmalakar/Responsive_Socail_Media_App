import React, { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import Loader from "./Loader";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
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
        setLoader(false);
      });
    };

    getdata();
    console.log("All posts ", posts);
  }, []);

  return (
    <>
      {!loader ? (
        <>
          <div className="my-5"></div>
          {posts.map((p) => (
            <BlogPost key={p.uid} p={p} />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AllPost;
