import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import SignUp from "./SignUp";
import Message from "./Message";
import Welcome from "./Welcome";


class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    console.log("401 status");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignUp = (userdata) => {
        API.doSignUp(userdata)
            .then((status) => {
                if (status === 401) {
                    this.setState({
                        signedUp: true,
                        message: "SignUp Success,now Login..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/");
                } else if (status === 201) {
                    this.setState({
                        signedUp: false,
                        message: "User with this username already exists!!"
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">
                {/*<Route exact path="/" render={() => (*/}
                    {/*<div>*/}
                        {/*<Message message="You have landed on my App !!"/>*/}
                        {/*<button className="btn btn-success" onClick={() => {*/}
                            {/*this.props.history.push("/login");*/}
                        {/*}}>*/}
                            {/*Login*/}
                        {/*</button>*/}
                    {/*</div>*/}
                {/*)}/>*/}

                <Route exact path="/" render={() => (
                    <div>
                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <img src="https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/dropbox-logo@2x.jpg" height={80}/>
                                </div>
                            </div>
                        </nav>
                        <div className="col-sm-3 col-md-3 col-lg-6">
                            <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png" height={400}/>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            <Login handleSubmit={this.handleSubmit} message={this.state.message}/>
                            <Message message={this.state.message} />
                            <SignUp handleSignUp={this.handleSignUp} message={this.state.message} pageState={this.state.pageState}/>
                            <Message message={this.state.message}/>
                        </div>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <Welcome username={this.state.username}/>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);