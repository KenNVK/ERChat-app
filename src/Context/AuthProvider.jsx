import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        history.push("/");
        return;
      }
      setIsLoading(false);
      history.push("/login");
    });

    // clean function
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
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
