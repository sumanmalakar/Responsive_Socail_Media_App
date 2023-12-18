// CommentSection.js
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";
import ShowComments from "./ShowComments";
import { getAuth } from "firebase/auth";
import Loader from "./Loader";

const CommentSection = ({ postId, setcommnetLength }) => {
  const auth = getAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true)

   const filteredComments = comments.filter(
     (comment) => comment.postId == postId
   );

   // console.log(filteredComments.length())
   const size = filteredComments.length;

  useEffect(() => {
  
    const commentsQuery = query(
      collection(db, "comments"),
      orderBy("timestamp", "desc")
    );

    const comments = onSnapshot(commentsQuery, (snapshot) => {
      const commentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentList);
      setLoading(false)
    });

    return () => comments();
  }, [postId]);

  const handleAddComment = async (e) => {
    if (auth.currentUser) {
      e.preventDefault();
      try {
        await addDoc(collection(db, "comments"), {
          postId,
          message: newComment,
          author: auth.currentUser.displayName,
          photoUrl: auth.currentUser.photoURL,
          timestamp: new Date(),
        });

       

        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error.message);
      }
    } else {
      alert("Login First");
    }
  };
  // console.log("comments ", comments);
  // console.log(postId);
 
  return (
    <div>
      <form onSubmit={handleAddComment} className="form">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="form-control"
          required
        />
        <button className="btn btn-primary">Add Comment</button>
      </form>
      <h3 className="my-3"> Total Comments :- {size}</h3>
      {loading?(
        <Loader />
      ):(<>

      {filteredComments.map((comment) => (
        <ShowComments key={comment.id} comment={comment} />
        ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
