import React, {Component} from 'react';
import './Header.css';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import pexels from '../../assets/profilePicture.svg';
import {withStyles} from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    avatar: {
        margin: "0px 0px 0px 15px",
        width: 30,
        height: 30,
        verticalAlign:'middle'
    },
})



class Header extends Component {

    constructor() {
        super();
        this.state = {
            accesstoken: sessionStorage.getItem("access-token"),
            loggedIn: sessionStorage.getItem("access-token") === "null" ? false : true,
            searchText: "",
            menuOpen: false,
            anchorEl: null,
        }
        //this.anchorEl = this.anchorEl.bind(this);
    }

    searchHandler = (e) => {
        this.setState({searchText: e.target.value});
        this.props.updateSearchCB(e.target.value);
    }

    handleClick = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        console.log("Onclick called");
        this.setState({menuOpen : true});
    }

    handleClose = (event) => {
        this.setState({menuOpen: false});
        this.setState({menuOpen: false});
    }

    handleLogout =  () => {
        sessionStorage.removeItem("access_token");
        this.setState({ loggedIn: false });
    }

    render() {

        const {classes} = this.props;


        return(
            <div>
                <header className="app-header">
                    <span  className="app-logo" > Image Viewer </span>
                    {this.props.data.inHomePage===true &&
                            <div className="right">
                                <div className="search-box">
                                    <SearchIcon className="searchIcon"/>
                                    <FormControl className="search-bar" >
                                        <Input className="search-bar-input" type="text" placeholder="Search..." disableUnderline={true} onChange={this.searchHandler} aria-controls="simple-menu" aria-haspopup="true"/>
                                        {this.state.menuOpen===true ? (
                                            <div className="menuDiv">
                                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                            </div>) : null
                                        }
                                    </FormControl>

                                </div>
                                <Avatar alt="ProfilePicture" src={pexels} className={classes.avatar} onClick={this.handleClick}/>
                            </div>
                    }
                </header>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
