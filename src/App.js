import "./App.css";
import "antd/dist/antd.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import { useEffect } from "react";

function App() {
  // 最初にレンダリングされる時のみタイトルが出力される
  useEffect(() => {
    document.title = "ERChat";
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={ChatRoom} path="/" />
          </Switch>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
