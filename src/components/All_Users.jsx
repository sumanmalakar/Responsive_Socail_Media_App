import React, { useEffect, useState } from 'react'
import {
  onSnapshot,
  collection,
  query,
  orderBy
} from "firebase/firestore";
import { db } from '../firebase.config';
import ConvetDateTime from './ConvetDateTime';
import Loader from './Loader';

const All_Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)



  useEffect(() => {

    const commentsQuery = query(
      collection(db, "users"),
      orderBy("timestamp", "desc")
    );
    const getdata = async () => {
      await onSnapshot(commentsQuery, (snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setLoading(false)
      });
    };

    getdata();
    console.log(users);
  }, []);

  

  return (
    <>
      {(loading) ? (
        <Loader />
      ) : (
        <div className="container my-3 text-center">
          {users.map((data) => {
            return (
              <>
                <div className="items">
                  <div className="data" key={data.id}>
                    <img src={data.photoURL} alt="" />
                    <h3>{data.name}</h3>
                    <h6>{data.email}</h6>
                  </div>{" "}
                  <ConvetDateTime
                    seconds={data.timestamp.seconds}
                    nanoseconds={data.timestamp.nanoseconds}
                    text="Register Time : -"
                  />
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

export default All_Users