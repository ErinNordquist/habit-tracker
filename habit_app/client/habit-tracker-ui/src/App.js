import './css/App.css';
import {useState} from "react";
import HabitTable from "./components/HabitTable";
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import {AppBar,Drawer} from '@material-ui/core';

import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AuthActions from "./actions/AuthActions";
import {StyledButton, StyledDrawer} from "./components/styles"

function App(props) {
    //AuthActions.logout();
    //console.log(AuthActions.getCurrentUser());
    //const [user, setUser] = useState();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           AuthActions.getCurrentUser());
    const [loggedIn, setLoggedIn] = useState(AuthActions.getCurrentUser() !== null);

    const logInUser = () => {
        //setUser(username);
        setLoggedIn(AuthActions.getCurrentUser() !== null);
    }
    const logOutUser = () => {
        AuthActions.logout();
        setLoggedIn(AuthActions.getCurrentUser() !== null);
    }

  return (
    <div className="App">
        <BrowserRouter>
            <div className="App-header">
                <StyledDrawer variant="permanent" anchor={"left"}>
                    <div>Habit Tracker</div>
                    <Link to="/auth/create-account">
                        <StyledButton>Create Account</StyledButton>
                    </Link>
                    <Link to="/auth/login">
                        <StyledButton>Login</StyledButton>
                    </Link>
                    <Link to="/home">
                        <StyledButton>Home</StyledButton>
                    </Link>
                    <Link to="/auth/login">
                        <StyledButton onClick={logOutUser}>Log Out</StyledButton>
                    </Link>
                </StyledDrawer>
            </div>
            <div>
                <Switch>
                    <Route path="/auth/create-account">
                        <CreateUserForm/>
                    </Route>
                    <Route  path="/auth/login" exact>
                        <LoginForm logInUser = {logInUser} loggedIn={loggedIn}/>
                    </Route>
                    <Route path="/home">
                        <HabitTable loggedIn = {loggedIn} logOutUser={logOutUser}/>
                    </Route>

                </Switch>
            </div>
        </BrowserRouter>
    </div>

  );
}

export default App;
