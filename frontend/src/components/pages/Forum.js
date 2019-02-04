import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Forum.module.css';

import Footer from '../Footer';
import api from '../../modules/api'

import { ReactComponent as SearchIcon } from '../../img/search.svg';

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [
        {
          name: "質問",
          desc: "this is a test",
        },
        {
          name: "C 言語",
          desc: "this is a test",
        },
        {
          name: "Java",
          desc: "this is a test",
        },
        {
          name: "コース作成について",
          desc: "this is a test",
        },
        {
          name: "がんくんへの質問",
          desc: "this is a test",
        },
        {
          name: "雑談",
          desc: "this is a test",
        },


      ]
    }
  }
  render(){
    return (
      <div className={styles["topiclist-container"]}>
        {
          this.state.topics.map((v, i) => {
            return <div key={i} className={styles["topiclist-item"]}>
              <div className={styles["topiclist-name"]}>
                <a>
                  {v.name}
                </a>
              </div>
              <div className={styles["topiclist-desc"]}>
                {v.desc}
              </div>
            </div>
          })
        }
      </div>
    )
  }
}





class CreateThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.titleInput = React.createRef();
    this.descInput = React.createRef();
  }

  componentDidMount(){
    // test get
    // run
    //api.get(`/api/thread/?page=${1}&s=${20}&search=${"admin"}`).then(api.parseJson)
    //.then(response => console.log(response)).catch()    
  }

  onPost = e => {

    //run
    const title = this.titleInput.current.value;
    const desc = this.descInput.current.value;
    api.ex_post('/api/thread/',{
      title: title,
      text: desc,
      category: "Python"

    })
    if (this.props.onPost) this.props.onPost();
  }
  onCancel = e => {
    if (this.props.onCancel) this.props.onCancel();
  }
  render(){
    return (
      <div className={styles["newthread-container"]}>
        <div className={styles["newthread-controls"]}>
          <span className={styles["newthread-header"]}>スレッドの投稿</span>
          <span style={{marginLeft: "auto"}}>
            <button className={styles["newthread-cancel-btn"]} onClick={this.onCancel}>キャンセル</button>
            <button className={styles["newthread-post-btn"]} onClick={this.onPost}>投稿</button>
          </span>
        </div>
        <input type="text" placeholder="タイトルを書いてください" maxLength={30} className={styles["newthread-title-box"]} ref={this.titleInput}></input>
        <textarea placeholder="投稿内容を書いてください" maxLength={1000} className={styles["newthread-text-box"]} ref={this.descInput}></textarea>
      </div>
    )
  }
}



class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      selectedCat: false,
      isCreating: false,
      categories: [
        {name: "すべて", id: "all"},
        {name: "質問", id: "qa"},
        {name: "がんくんへの質問", id: "gqa"},
        {name: "提案", id: "pp"},
        {name: "コース作成について", id: "cr"},
        {name: "問題", id: "pr"},
        {name: "質問", id: "q"},
      ],
      posts: [
        {
          title: "コースの作成について",
          text: "テスト"
        },
        {
          title: "編集方法",
          text: "テスト"
        },
        {
          title: "hi",
          text: "what"
        },
        {
          title: "hi",
          text: "what"
        },
        {
          title: "hi",
          text: "what"
        },
      ]
    }
  }
  componentDidMount() {
    this.selectCat('all');
  }
  
  search = (e) => {
    console.log("search: ")
    this.setState({isSearching: true});
  }
  selectCat = (catId) => {
    this.search();
    this.setState({selectedCat: catId});
  }

  showCreatingForm = () => {
    this.setState({isCreating: true});
  }
  hideCreatingForm = () => {
    this.setState({isCreating: false});
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}
          style={{
            position: this.state.isSearching ? "sticky" : "",
          }}
        >

          <div className={styles["search-header"]}
            style={{
              height: this.state.isSearching ? "5em" : ""
            }}
            >
            <div className={styles["toolbar-right"]}
              style={{
                display: this.state.isSearching ? "none" : ""
              }}
              >
            {/*
              <div>おい</div>
              <div>やるぞ</div>
            */}
            </div>
            <span className={styles["title"]}
              style={{
                display: this.state.isSearching ? "none" : ""
              }}
            >気になることを探してみよう</span>
            <span className={styles["search-box-container"]}>
              <input type="text" className={styles["search-box"]} maxLength={30} onKeyPress={(e) => e.nativeEvent.key === "Enter" && this.search(e)}  />
              <SearchIcon />
            </span>
          </div>
          <div className={styles["toolbar"]}>
            <div className={styles["toolbar-left"]}>
              {
                this.state.categories.map((v, i) => {
                  return <div key={i} className={this.state.selectedCat === v.id && styles["toolbar-item-selected"]} onClick={() => this.selectCat(v.id)}>
                    {v.name}
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {
            this.state.selectedCat !== 'all' &&
            <div styles={{width: "100%"}}>
              {
                this.state.isCreating ?
                  <CreateThread onPost={this.hideCreatingForm} onCancel={this.hideCreatingForm} />
                :
                  <button className={styles["create-btn"]} onClick={this.showCreatingForm}>スレッドを新規作成</button>
              }
            </div>
          }
          {
            this.state.posts.map((v, i) => {
              return (
                <div key={i} className={styles["post"]}>
                  <div>
                    {v.title}
                    <span>avatar</span>
                    <span>username</span>
                  </div>
                  <div>{v.text}</div>
                </div>
              )
            })
          }
          <div style={{height: "5em"}}></div>
          <TopicList />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Forum;