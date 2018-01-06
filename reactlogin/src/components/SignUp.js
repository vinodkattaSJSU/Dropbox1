import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SignUp extends Component {
    static propTypes = {
        handleSignUp: PropTypes.func.isRequired,
       // pageState:PropTypes.checkPropTypes.isRequired
    };
    state={
       username: '',
       password: '',
       firstname:'',
       lastname:''
   };

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>SignUp</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="firstname"
                                placeholder="Enter first name"
                                value={this.state.firstname}
                                onChange={(event) => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="lastname"
                                placeholder="Enter last name"
                                value={this.state.lastname}
                                onChange={(event) => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSignUp(this.state)}
                            >
                                SignUp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;