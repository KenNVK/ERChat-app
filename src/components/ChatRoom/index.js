import { Button } from "antd";
import React from "react";
import { auth } from "../../firebase/config";

export default function ChatRoom() {
  const handleLogout = () => {
    console.log("AA");
    auth.signOut();
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
