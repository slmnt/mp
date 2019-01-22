import React from 'react';
import { Link } from 'react-router-dom';


import styles from './Navbar.module.css';
import { ReactComponent as Ham } from '../img/hamburger.svg';

import {MainContext} from '../contexts/main';
import Hamon from './helper/Hamon';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showUserPopup: false
    };
  }
  onClickMenu = e => {
    if (this.props.onClickMenu) {
      this.props.onClickMenu(e);
    }
  }
  componentDidUpdate(){
    // console.log(this.context)
  }
  render() {
    /* flexbox で全て解決 */
    return (
      <nav className={styles.main}>
        {
          this.state.showUserPopup &&
            <div className={styles["user-popup"]}>
              skrr
            </div>
        }
        <div>
          <div className={styles.mobileButton} onClick={this.onClickMenu}>
            <Ham className={styles.hamburger}/>
            <Hamon />
          </div>
          
          <div className={styles.logo}>
            <Link to="/">MiniProg</Link>
          </div>
        </div>

        {this.props.children}

        <div>{"login: " + (this.context.isLoggedIn ? true : false) }</div>

        <div className={styles.rightMenu}>
          {
            !this.context.isLoggedIn ?
              <React.Fragment>
                <div><Link to="/login">ログイン</Link></div>
                <div><Link to="/signup">会員登録</Link></div>
              </React.Fragment>
            :
              <React.Fragment>
                <div>
                  {this.context.uid}
                </div>
                <div className={styles.avatar} onClick={() => this.setState({showUserPopup: !this.state.showUserPopup})}>
                </div>
              </React.Fragment>
          }
        </div>
      </nav>
    );
  }
}
NavBar.contextType = MainContext;
export default NavBar;

