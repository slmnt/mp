import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from '../Loading';
import Ad from '../AdPanel';
import axios from 'axios';

import { Link } from 'react-router-dom';

import styles from './UserSearch.module.css';

import api from '../../modules/api';

import { ReactComponent as FavIcon } from '../../img/fav.svg';
import { ReactComponent as SearchIcon } from '../../img/search.svg';


class UserSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {
            keyword: 'test',
            context: [],
            users: [
                {
                    root: "Dr. MOnta",
                    profile: "croues1desc",
                    subscribed: 21,
                    avatar: "",
                    id: 12
                },
                {
                    root: "Kang the greatest",
                    profile: "croues1desc",
                    subscribed: 21,
                    avatar: "",
                    id: 12
                },
                {
                    root: "Kang the greatest",
                    profile: "croues1desc",
                    subscribed: 21,
                    avatar: "",
                    id: 12
                },
            ],
        }

        this.langOption = React.createRef();
    }

    componentDidMount(){

        var u = '/getuser'
        axios.get(u).then(response => {
            this.setState({
                users: response.data
            })
        }).catch(e => console.log(e))        
    }
    
    handleChange = (event) => {
        this.setState({keyword: event.target.value});
    }

    onSearch = (e) => {
       let path = '/api/searchuser/' + this.state.keyword
       api.get(path).then(response => response.json())
       .then(response => this.setState({users: response})).catch()

    }
    
    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["header"]}>
                    <div className={styles["title-container"]}>
                        ユーザ検索
                    </div>
                    <div className={styles["search-container"]}>
                        <span className={styles["search-box-container"]}>
                            <input 
                                onKeyPress={(e) => e.nativeEvent.key === "Enter" && this.onSearch(e)} 
                                className={styles["search-box"]} 
                                value={this.state.keyword} 
                                onChange={this.handleChange}
                                >
                            </input>
                            <span className={styles["search-box-icon"]} onClick={this.onSearch}>
                                <SearchIcon/>
                            </span>
                        </span>
                    </div>
                    <div className={styles["option-container"]}>
                    </div>
                </div>
                
                <div className={styles["container"]}>
                    <div className={styles["ad-container"]}>
                        <Ad/>
                    </div>
                    <div className={styles["course-container"]}>
                        {
                            this.state.users.map((v, i) => {
                                return (
                                    <div key={i} className={styles["course-item"]}>
                                        <div className={styles["course-item-score"]}>
                                            <div><FavIcon /></div>
                                            <div>{v.subscribed}</div>
                                        </div>
                                        <span className={styles["course-item-user-avatar"]}>
                                            <img src={v.avatar}></img>
                                        </span>
                                        <div className={styles["course-item-main"]}>
                                            <Link to={"/user/" + v.id} className={styles["course-item-user"]}>
                                                <span className={styles["course-item-user-name"]}>
                                                    {v.root}
                                                </span>
                                            </Link>
                                            <div className={styles["course-item-desc"]}>
                                                {v.profile}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
  	}
}

UserSearch.propTypes = {};

export default UserSearch;