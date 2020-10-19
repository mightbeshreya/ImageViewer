import React, {Component} from 'react';
import './Header.css';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import pexels from '../../assets/profilePicture.svg';
import {withStyles} from "@material-ui/core/styles";

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
            searchText: ""
        }
    }

    searchHandler = (e) => {
        this.setState({searchText: e.target.value});

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
                                        <Input className="search-bar-input" type="text" placeholder="Search..." disableUnderline={true} onChange={this.searchHandler}/>

                                    </FormControl>

                                </div>
                                <Avatar alt="ProfilePicture" src={pexels} className={classes.avatar}/>
                            </div>
                    }
                </header>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
