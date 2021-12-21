import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isSettedStatus, setIsSettedStatus] = useState(true);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL, isOnline: true });
        setIsLoading(false);
        history.push("/");
        setIsSettedStatus(false);
        return;
      }
      setIsSettedStatus(true);
      setIsLoading(false);
      history.push("/login");
    });

    // clean function
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, isSettedStatus, setIsSettedStatus }}>
      {isLoading ? (
        <Spin
          size="large"
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        ></Spin>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
