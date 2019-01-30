import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './CourseInfo.module.css';
import api from '../../modules/api';

import {MainContext} from '../../contexts/main';

import UserPanel from '../UserPanel';
import Rating from '../Rating';

class Courseinfo extends Component {

    constructor (props) {
        super(props);

        this.state = {
            courseId: this.props.match.params.id,

            contents: {
                title: "peeton",
                descriptoin: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                root: "",
                likes: 3.5,
                users: 100
            },
            chapters: [
                {
                    title: "chapter 1",
                    descriptoin: "peeton basics"
                }
            ],
            reviews: [
                {
                    auth: "",
                    comment: "11/10 would not play again",
                    createat: "2019/01/22 19:45",
                }
            ],

            currentTab: 0,
        }

        this.reviewTextarea = React.createRef();
    }
    setTab(id) {
        this.setState({currentTab: id});
    }

    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }

    componentDidMount(){

        var u = '/getusercourseid/';
        axios.post(u,{id:this.props.match.params.id}).then(response => {
            this.setState({contents: response.data})
        }).catch(e => console.log(e))

        u = '/getCourseInfoContentsInfo/' + this.props.match.params.id
        axios.get(u).then(response => {
            this.setState({chapters: response.data})
        }).catch(e => console.log(e))

        u = '/getusercoursecomment/' + this.props.match.params.id
        axios.get(u).then(response => {
            this.setState({reviews: response.data})
        }).catch(e => console.log(e))

    }

    sendReview = () => {
        console.log("send");
    }

    //<UserPanel username="Kang the polyglot" desc="I can speak Korean, Japanese and English fluently." avatar=".png"/>

    render() {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles["info-panel"]}>
                        <div className={styles["header-container"]}>
                            <div className={styles["course-name"]}>
                                {this.state.contents.title}
                            </div>
                            {
                                this.state.contents.root == this.context.uid &&
                                <Link to={`/course/${this.context.uid}/${this.state.courseId}/edit`} style={{marginLeft: "auto"}}>
                                    <div className={styles["edit-button"]}>
                                        編集
                                    </div>
                                </Link>
                            }
                            <Link to={`/course/${this.context.uid}/${this.state.courseId}/1`}>
                                <div className={styles["start-button"]}>
                                    始める
                                </div>
                            </Link>
                        </div>
                        <div className={styles["middle-container"]}>
                            <div className={styles["rating-container"]}>
                                <Rating value={this.state.contents.likes}/>
                                <span className={styles.rating}>
                                    {this.state.contents.likes / 5}
                                </span>
                                <span className={styles["rate-info"]}>
                                    ({this.state.contents.users})
                                </span>
                            </div>
                            <div style={{fontSize: "1.2em"}}>
                                <UserPanel username={this.state.contents.root} desc="Kang the polyglot will destroy you"/>
                            </div>
                        </div>
                        <div>
                            <div className={styles.description}>
                                {this.state.contents.descriptoin}
                            </div>
                        </div>
                    </div>
                    <div className={styles["tab-list"]}>
                        <div onClick={() => this.setTab(0)} className={this.state.currentTab === 0 ? styles["tab-onclicked"] : ""}><span>チャプター</span></div>
                        <div onClick={() => this.setTab(1)} className={this.state.currentTab === 1 ? styles["tab-onclicked"] : ""}><span>レビュー</span></div>
                    </div>
                    <div className={styles["tab-content"]}>
                        {
                            this.state.currentTab === 0 ?
                            <div className={styles["chapter-container"]}>
                                <div className={styles["chapter-list"]}>
                                    {
                                        this.state.chapters.map((v, i) => {
                                            return <div key={i}>
                                                <div className={styles["chapter-header"]}>
                                                    <div className={styles["chapter-name"]}>
                                                        <a>{v.title}</a>
                                                    </div>
                                                    <Link to={`/course/${this.context.uid}/${this.state.courseId}/${i + 1}`} className={styles["chapter-start-button"]}>
                                                        開始
                                                    </Link>
                                                </div>
                                                <div className={styles["chapter-desc"]}>
                                                    {v.descriptoin}
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        :
                            <div className={styles["review-container"]}>
                                <div className={styles["review-post"]}>
                                    <div>書く</div>
                                    <textarea className={styles["review-textarea"]} ref={this.reviewTextarea}></textarea>
                                    <div style={{marginLeft: "auto"}}>
                                        <button className={styles["review-send"]} onClick={this.sendReview}>送信</button>
                                    </div>
                                </div>
                                <div className={styles["review-list"]}>
                                {
                                    this.state.reviews.map((v, i) => {
                                        return <div key={i}>
                                            <UserPanel username={v.auth || "Monta"} desc="Winter is comming. Kang the polyglot will destroy you."/>
                                            <div className={styles["review-text"]}>
                                                {v.comment}
                                            </div>
                                            <div className={styles["review-info"]}>
                                                {this.convertdata(v.createat)}
                                            </div>
                                        </div>
                                    })
                                }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
  	}
}

Courseinfo.propTypes = {};
Courseinfo.contextType = MainContext;


export default Courseinfo;