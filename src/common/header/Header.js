import React, {Component} from 'react';
import './Header.css';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
    render() {
        return(
            <div>
                <header className="app-header">
                    <span  className="app-logo" > Image Viewer </span>
                    {this.props.data.inHomePage===true &&

                            <div className="search-box">
                                <SearchIcon className="searchIcon"/>
                                <FormControl className="search-bar">
                                    <Input className="search-bar-input" type="text" placeholder="Search..." disableUnderline={true} />
                                </FormControl>
                            </div>

                    }
                </header>
            </div>
        );
    }
}

export default Header;
