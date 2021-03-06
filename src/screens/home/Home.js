import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import pexels from '../../assets/profilePicture.svg';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import CardActions from '@material-ui/core/CardActions';
import Login from "../login/Login";
import ReactDOM from 'react-dom';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    card: {
        maxWidth: 550,
        margin: 20,
        minHeight: '700px',
        marginLeft: '4%',

    },
    avatar: {
        margin: 15,
        width: 60,
        height: 60,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
    formControl: {
        margin: "0px 0px 0px 60px",
        minWidth: 240,
        maxWidth: 240,

    },
});

class Home extends Component {

    constructor(){
        super();
        this.state = {
            accesstoken: sessionStorage.getItem("access-token"),
            loggedIn: sessionStorage.getItem("access-token") === "null" ? false : true,
            userImagesId: [],
            imageData: [],
            caption: "",
            liked: [],
            likes: [],
            commentsInPost: [],
            commentByUser: "",
            searchText: ""
        }
        this.updateSearch = this.updateSearch;
        this.loggedOut = this.loggedOut;
        console.log(this.state);
    }

    updateSearch = (searchText) => { console.log("SearchText::: "+searchText);this.setState({ searchText })}
    loggedOut = (loggedIn) => {
        console.log(loggedIn);
        this.setState({loggedIn});
        this.gotoLogin();
    }

    gotoLogin() {
        ReactDOM.render(<Login/>,document.getElementById('root'));
    }

    componentWillMount() {
        let images = [];
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if(this.readyState===4) {
                console.log(JSON.parse(this.responseText));
                images = JSON.parse(this.responseText).data;
                console.log(images);
                that.setState({userImagesId: JSON.parse(this.responseText).data});
                let thatthat = that;
                for(var i=0; i<images.length; i++) {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(JSON.parse(this.responseText));
                            var x = JSON.parse(this.responseText)
                            var joined = thatthat.state.imageData.concat(x);
                            thatthat.setState({imageData:joined});
                            var y = thatthat.state.liked.concat('false')
                            thatthat.setState({liked:y})
                            var z = thatthat.state.likes.concat('2')
                            thatthat.setState({likes:z});
                            var comm = thatthat.state.commentsInPost.concat('c');
                            thatthat.setState({commentsInPost:comm});
                        }
                    });
                    xhr2.open('GET', "https://graph.instagram.com/"+images[i].id+"?fields=id,media_type,media_url,username,timestamp&access_token="+that.state.accesstoken);
                    xhr2.send();
                }

            }
        });
        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token="+this.state.accesstoken);
        xhr.send();
    }

getCaption(id)
{
    for (var i = 0; i < this.state.userImagesId.length; i++) {
        if (this.state.userImagesId[i].id === id) {
            return this.state.userImagesId[i].caption;
        }
    }
}

getOnlyCaption(id) {
    for (var i = 0; i < this.state.userImagesId.length; i++) {
        if (this.state.userImagesId[i].id === id) {
            var onlyCaption =  this.state.userImagesId[i].caption;
            return onlyCaption.replace(/(^|\s)(#[a-z\d-]+)/ig, "");
        }
    }
}

findHashtags(searchText) {
    var x = this.getCaption(searchText)
    var regexp = /\B\#\w\w+\b/g
    var result = x.match(regexp);
    if (result) {
        console.log("Hashtags: "+result);
        return result.toString();
    } else {
        return "";
    }
}

updateLiked = i => {
    this.setState(state => {
        const liked = state.liked.map((item, j) => {
            if (j === i) {
                return !item;
            } else {
                return item;
            }
        });

        return {
            liked,
        };
    });
};

    updateLikes = (i, str) => {
        this.setState(state => {
            const likes = state.likes.map((item, j) => {
                if (j === i) {
                    if(str === "plus") {
                        return parseInt(item) + 1;
                    }else {
                        return parseInt(item) - 1;
                    }
                } else {
                    return item;
                }
            });

            return {
                likes,
            };
        });
    };

    inputCommentHandler= (e) => {
        this.setState({commentByUser: e.target.value});
    }

    addCommentHandler= (e, index) => {
        this.setState(state => {
            const commentsInPost = state.commentsInPost.map((item, j) => {
                if (j === index) {
                    var actualComment = this.state.commentByUser;
                    this.setState({
                        commentByUser:""
                    })
                    return actualComment;
                } else {
                    return item;
                }
            });

            return {
                commentsInPost,
            };
        });
    }

    getImageFilter(id) {
        for (var i = 0; i < this.state.imageData.length; i++) {
            if (this.state.imageData[i].id === id) {
                return this.state.imageData[i].media_url;
            }
        }
    }

    render() {
        const { classes } = this.props;

        const { searchText, userImagesId } = this.state;
        const lowercasedFilter = searchText.toLowerCase();
        const filteredData = userImagesId.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toLowerCase().includes(lowercasedFilter)
            );
        });

        return(
            <div>
                <Header data={this.props.data} updateSearchCB={this.updateSearch} updateLoggedOut={this.loggedOut}/>
                <div className="postGrid">
                    <GridList cols={2}>
                        {this.state.searchText==="" && this.state.imageData.map((img,index) => (
                            <Card className={classes.card} key={"card"+img.id}>
                                <CardHeader avatar={<Avatar alt="ProfilePicture" src={pexels} className={classes.avatar}/>}
                                            title={img.username}
                                            subheader={moment(new Date(img.timestamp)).format("DD/MM/YYYY HH:mm:ss")}
                                />
                                <CardContent>
                                    <GridListTile key={"image"+ img.id} className="user-image-grid-item">
                                        <div className="instaImageDiv">
                                            <img src={img.media_url} className="instaImage" alt="IMAGE"/>
                                        </div>
                                        <hr/>
                                        <div className="caption">
                                            {this.getOnlyCaption(img.id)}
                                        </div>
                                        <div className="hashtags">
                                            {this.findHashtags(img.id).replace(",", " ")}
                                        </div>
                                        <div>
                                            <div onClick={(event)=> {
                                                if(this.state.liked[index]){
                                                    this.updateLiked(index);
                                                    this.updateLikes(index, "plus")
                                                }else {
                                                    this.updateLiked(index);
                                                    this.updateLikes(index, "minus");
                                                }
                                            } }>
                                            {this.state.liked[index] ?
                                                <FavoriteBorder className="favBorIcon" />: <Favorite className="favIcon" />
                                            }
                                            {this.state.likes[index]} Likes
                                            </div>
                                        </div><br/>
                                        {this.state.commentsInPost[index] !== "c" &&
                                        <span
                                            className="actualComment"><span className="makeBold"> {img.username}</span>: {this.state.commentsInPost[index]}
                                        </span>
                                        }

                                        <div className="addCommentDiv">
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="comment-text">Add a comment</InputLabel>
                                                <Input id="comment-text" type="text" commentByUser={this.state.commentByUser} onChange={this.inputCommentHandler} />
                                            </FormControl>
                                            <Button variant="contained" color="primary" onClick={(event)=>this.addCommentHandler(event,index)} className="addCommentButton">ADD</Button>
                                        </div>
                                    </GridListTile>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        ))}
                        {this.state.searchText!=="" && filteredData.map((img,index) => (
                            <Card className={classes.card} key={"card_search"+img.id}>
                                <CardHeader avatar={<Avatar alt="ProfilePicture" src={pexels} className={classes.avatar}/>}
                                            title={img.username}
                                            subheader={moment(new Date(img.timestamp)).format("DD/MM/YYYY HH:mm:ss")}
                                />
                                <CardContent>
                                    <GridListTile key={"image"+ img.id} className="user-image-grid-item">
                                        <div className="instaImageDiv">
                                            <img src={this.getImageFilter(img.id)} className="instaImage" alt="IMAGE"/>
                                        </div>
                                        <hr/>
                                        <div className="caption">
                                            {this.getOnlyCaption(img.id)}
                                        </div>
                                        <div className="hashtags">
                                            {this.findHashtags(img.id).replace(",", " ")}
                                        </div>
                                        <div>
                                            <div onClick={(event)=> {
                                                if(this.state.liked[index]){
                                                    this.updateLiked(index);
                                                    this.updateLikes(index, "plus")
                                                }else {
                                                    this.updateLiked(index);
                                                    this.updateLikes(index, "minus");
                                                }
                                            } }>
                                                {this.state.liked[index] ?
                                                    <FavoriteBorder className="favBorIcon" />: <Favorite className="favIcon" />
                                                }
                                                {this.state.likes[index]} Likes
                                            </div>
                                        </div><br/>
                                        {this.state.commentsInPost[index] !== "c" &&
                                        <span
                                            className="actualComment"><span className="makeBold"> {img.username}</span>: {this.state.commentsInPost[index]}
                                        </span>
                                        }

                                        <div className="addCommentDiv">
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="comment-text">Add a comment</InputLabel>
                                                <Input id="comment-text" type="text" commentByUser={this.state.commentByUser} onChange={this.inputCommentHandler} />
                                            </FormControl>
                                            <Button variant="contained" color="primary" onClick={(event)=>this.addCommentHandler(event,index)} className="addCommentButton">ADD</Button>
                                        </div>
                                    </GridListTile>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        ))}
                    </GridList>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
