import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import Header from '../../common/header/Header';
import Home from '../home/Home';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
    root: {
        minWidth: 300,
        width: 100,
        marginLeft: "38%",
        padding: "0px 16px"
    }
});

class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loggedIn: false,
            loginUnsuccessful: false,
            inHomePage: false
        }
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        if(this.state.username==="" || this.state.loginPassword==="") {
            return ;
        }
        let username = "superuser";
        let password = "superUser";
        console.log("Username: "+this.state.username);
        console.log("Password: "+this.state.loginPassword);
        let accessToken = "IGQVJXX0RCTXlRRnRZAdGwtNnhiVURka09fVTV0cVFYVVVfZAEZAIZA1llbXlIaFZAMRnJTbXpxcWo0RkhTY1gtUllFUjRoV2F6cjlBeEdwOU1WMVZAuRzlhcXhGR3NKam9YTG5BMEx6elFVRWp4eGdxSTRyMWtFSjlSQTJmVmhF";
        if(this.state.username === username && this.state.loginPassword === password) {

            sessionStorage.setItem("access-token", accessToken);
            this.setState({
                loggedIn: true,
                loginUnsuccessful: false,
                inHomePage: true
            }, ()=> {
                ReactDOM.render(<Home data={this.state}/>, document.getElementById('root'));
            });
            //let that = this;
            //ReactDOM.render(<Home />, document.getElementById('root'));
        }else {
            this.setState({
                loginUnsuccessful: true,
            })
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Header data={this.state}/>
                <Card className={classes.root}>
                    <Typography className="loginHeading">LOGIN</Typography>
                    <CardContent>
                        <FormControl required>
                            <InputLabel htmlFor="userName">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}/>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl> <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        {this.state.loginUnsuccessful === true &&
                        <FormControl className="incorrectCreds">
                                    <span className="red">
                                        Incorrect username and/or password
                                    </span>
                        </FormControl>
                        }
                        <br/><br/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler} className="loginButton">Login</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
