import React from 'react'
import ConvetDateTime from './ConvetDateTime';

const ShowComments = ({comment}) => {
  return (
    // <div key={comment.id}>
    <> 
      <div className="container my-4 comment">
        <div className="comments">
          <img src={comment.photoUrl} alt="" />
          <h5>{comment.author}</h5>
        </div>
        <p key={comment.id}>{comment.message}</p>
        <h5>
          <ConvetDateTime seconds={comment.timestamp.seconds}  nanoseconds={comment.timestamp.nanoseconds}/>{" "}
        </h5>
      </div>
    </>
  );
}

export default ShowComments