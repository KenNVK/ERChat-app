import "./App.css";
import "antd/dist/antd.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={ChatRoom} path="/" />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
