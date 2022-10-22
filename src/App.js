import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./components/layout/Main";
import AddUser from "./pages/Add User/AddUser";
import ViewUser from "./pages/View User/ViewUser";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/user/add" component={AddUser} />
          <Route exact path="/user/view" component={ViewUser} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
