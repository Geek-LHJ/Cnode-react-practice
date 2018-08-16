import {fetchTopicData} from './services'
import React, { Component } from 'react';
import './MyApp.css';
import {Link} from 'react-router-dom'

class Topic extends Component{
    constructor(){
        super();
        this.setPage=this.setPage.bind(this);
        this.state = {
            indexList:[],//当前渲染的页面数据
            data:[],  //总的数据
            current: 1, //当前页码
            pageSize:50, //每页显示的条数
            totalPage:0,//总页数
        };
      }
      componentDidMount(){
        fetchTopicData().then((res)=>{
          const { pageSize } = this.state;  
          this.setState({
            data : res.data,
            totalPage : Math.ceil( res.data.length / pageSize), 
            indexList : res.data.slice(0, pageSize),   
          })
        });
    }

    //根据页码重置当前内容
    setPage(pageNumber){  
      const { pageSize } = this.state;
      const startIndex = (pageNumber - 1) * pageSize;
      this.setState({
          indexList : this.state.data.slice(startIndex, startIndex + pageSize),
      })
    }

      render() {
        return (
            <div className="container">
              <Content {...this.state} setPage={this.setPage}/>
            </div>
        );
      }
}

class Content extends Component { 
    render(){
      let list = this.props.indexList.map((element,index) => {
        return <li key={index} ><Link to={`/details/${element.id}`}>{index + 1}、{element.title}</Link></li>;
      });
      return (
        <div className="main">
              <ul className="main-list">
                {list}
              </ul>
              <PageButton { ...this.props}/>
        </div>
      );
    }
  }
  //上下頁按钮
class PageButton extends Component {
    constructor(props) {
        super(props);
        this.setNext=this.setNext.bind(this);
        this.setUp=this.setUp.bind(this);
        this.state={
            current:this.props.current 
        }
    }
    //下一页
    setNext(){
        if( this.state.current < this.props.totalPage){
            this.setState({
                current:this.state.current + 1 
            },function () {
                this.props.setPage(this.state.current);
            })
        }
    }
    //上一页
    setUp(){
        if(this.state.current > 1){
            this.setState({
                current:this.state.current - 1 
            },function () {
                this.props.setPage(this.state.current);
            })
        }
    }
    render() {
        return (
            <div className="change_page">
                <span onClick={ this.setUp } >&lt;</span>
                <span>{ this.state.current }/ {this.props.totalPage}</span>
                <span onClick={ this.setNext }>&gt;</span>
            </div>
        );
    }
}
export default Topic