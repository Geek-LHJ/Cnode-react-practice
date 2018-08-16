import './MyApp.css';
import logo from './logo.png';
import Topic from './Mytopic'
import DetailPage from './Mydetail'
import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div >
          <Header />
          <Switch>
            <Route path="/details/:id" component={DetailPage}></Route>
            <Route path="/topics" component={Topic}></Route>
            <Redirect exact path="/" to="/topics" />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <div>
        <div className="topBar container">
          <div className="logo fl" >
            <img src={logo} className="App-logo " alt="logo" />
            <input type="text" className="search_box fr" />
          </div>
          <div className="navBar fr">
            <ul>
              <li className="fl">首页</li>
              <li className="fl">新手入门</li>
              <li className="fl">API</li>
              <li className="fl">关于</li>
              <li className="fl">注册</li>
              <li className="fl">登录</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
