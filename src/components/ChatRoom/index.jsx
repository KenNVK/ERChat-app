import { Button } from "antd";
import React from "react";
import { auth } from "../../firebase/config";
import { useHistory } from "react-router-dom";

export default function ChatRoom() {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <div>
      This is chat room
      <Button danger onClick={handleLogout}>
        <span>Logout</span>
      </Button>
    </div>
  );
}
