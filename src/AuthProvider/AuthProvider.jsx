import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
     setUser(loggedUser);
     if(loggedUser){
      axios.post("https://summer-camp-school-server-eosin.vercel.app/jwt",{ email: loggedUser?.email})
      .then(data =>{
        // console.log(data.data.token);
        localStorage.setItem("access-token", data.data.token)
        setLoading(false);
      })
     }else{
      localStorage.removeItem("access-token")
      setLoading(false);
     }
   });
   return () => {
     return unsubscribe;
   };
 }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logout,
    googleSignIn,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
