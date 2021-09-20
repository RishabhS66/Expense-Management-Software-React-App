import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarHeader from "./components/NavbarHeader/NavbarHeader";
import Client from "./components/Client/Client";
import Project from "./components/Project/Project";
import Employees from "./components/Employees";
import ChangePassword from "./components/Login/ChangePassword";
import Home from "./components/Home";
import AddExpenseSheet from "./components/Expense/AddExpenseSheet";
import ProjectSummary from "./components/Project/ProjectSummary";
import Approvals from "./components/Approval/Approvals";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import LogoutConfirmation from "./components/Logout/LogoutConfirmation";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";


function App() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        {isLoggedIn && <NavbarHeader />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/changepwd" component={ChangePassword} />
          <PrivateRoute path="/expenseEntries" component={AddExpenseSheet} />
          <PrivateRoute path="/clients" component={Client} />
          <PrivateRoute path="/projects" component={Project} />
          <PrivateRoute
            exact
            path="/projectsummary"
            component={ProjectSummary}
          />
          <PrivateRoute
            path="/projectsummary/:pid"
            component={ProjectSummary}
          />
          <PrivateRoute path="/approvals" component={Approvals} />
          {isLoggedIn && user.role === "ADMIN" && (<PrivateRoute path="/addemployee" component={AddEmployee} />)}
          <PrivateRoute path="/employees" component={Employees} />
          <Route exact path="/logout" component={Logout} />
          <Route
            exact
            path="/logoutconfirmation"
            component={LogoutConfirmation}
          />
          <Route default component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
