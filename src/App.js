import "./App.css";
import "antd/dist/antd.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";
import React, { useEffect } from "react";

function App() {
  // 最初にレンダリングされる時のみタイトルが出力される
  useEffect(() => {
    document.title = "ERChat";
  }, []);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Switch>
                <Route component={Login} path="/login" />
                <Route component={ChatRoom} path="/" />
              </Switch>
            </Switch>
            <AddRoomModal />
            <InviteMemberModal />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
