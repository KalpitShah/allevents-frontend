import React, { useContext, useState, useEffect } from "react";
import { auth } from "../configs/firebase-config";
import axiosUtil from "../utils/axiosUtil";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>();
  const [currentUserData, setCurrentUserData] = useState(null);
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false);

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      await axiosUtil
        .get(`/user/read.php?id=${user.uid}`)
        .then((response) => {
          setCurrentUserData(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            // User does not exist, create new user
            return axiosUtil.post(`/user/create.php`, {
              user_id: user.uid,
              name: user.displayName,
              image_url: user.photoURL,
              email: user.email,
            });
          } else {
            // Some other error occurred
            console.error(error);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user);

      setCurrentUser(user);
      if (user) {
        setVerifiedEmail(user.emailVerified);
        let resultToken = await user.getIdToken();
        // let resultUserData = await axios.get(`/current-user/${user?.uid}`);
        // setCurrentUserData(resultUserData.data.result);
        setToken(resultToken);
        setLoading(false);
        // console.log("User DB Data =>", resultUserData.data.result);
      } else {
        setToken(null);
        setLoading(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    token,
    currentUserData,
    verifiedEmail,
    loading,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
