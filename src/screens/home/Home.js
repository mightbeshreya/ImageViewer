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
import moment from 'moment'

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
        minHeight: '500px',
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
    }
});

class Home extends Component {

    constructor(){
        super();
        this.state = {
            accesstoken: sessionStorage.getItem("access-token"),
            loggedIn: sessionStorage.getItem("access-token") === "null" ? false : true,
            userImagesId: [],
            imageData: [],
        }
        console.log(this.state);
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
                            var joined = thatthat.state.imageData.concat(JSON.parse(this.responseText));
                            thatthat.setState({imageData:joined});
                            console.log(thatthat.state);
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

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Header data={this.props.data}/>
                <div className="postGrid">
                    <GridList cols={2}>
                        {this.state.imageData.map(img => (

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

                                        </div>
                                    </GridListTile>
                                </CardContent>
                            </Card>
                        ))}
                    </GridList>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
