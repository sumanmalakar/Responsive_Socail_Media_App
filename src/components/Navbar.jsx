import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // console.log(result.user);

    setIsAuthenticated(true);
    // Check for user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    // If user, doesn't exist, create user
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        timestamp: serverTimestamp(),
      });
    }

    navigate("/profile");
  };

  const signOut = () => {
    auth.signOut();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="nav_bar sticky-top">
        <Link to={"/"} className="left_user">
          {isAuthenticated ? (
            <>
              <div className="user">
                <img src={auth.currentUser?.photoURL} alt="" />
                <h3>{auth.currentUser.displayName}</h3>
              </div>
            </>
          ) : (
            <>
              <h3>Social Media App</h3>
            </>
          )}
        </Link>
        <div className="right_side">
          {isAuthenticated && (
            <Link to={"/post"} className="btn btn-warning mx-2">
              Post
            </Link>
          )}
          {!isAuthenticated && (
            <div
              onClick={signInWithGoogle}
              className="btn bg-light text-danger mx-2 d-flex justify-content-center align-items-center"
            >
              <FcGoogle
                style={{
                  marginRight: "10px",
                  fontSize: "1.7rem",
                }}
              />
              <h6>Login With Google</h6>
            </div>
          )}

          {isAuthenticated && (
            <Link to={"/profile"} className="btn btn-warning mx-2">
              {" "}
              Profile
            </Link>
          )}

          <Link to={"/allusers"} className="btn btn-warning mx-2">
            All User
          </Link>

          {isAuthenticated && (
            <button onClick={signOut} className="btn btn-warning mx-2">
              LogOut
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
