import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:"in",
    pageSize:8,
    category:"general"
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter = (inputString) => {
    if (typeof inputString !== 'string') {
      return inputString;
    }
  
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  

  constructor(props){
    super(props);
    this.state={
    articles: [],
    loading:false,
    page:1
  }
  document.title=`${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3929044e833b49c28a08cb0e11b84381&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
     this.setState({     
    articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false
    })
  }
  async componentDidMount(){
    this.updateNews();
    //console.log(this.state.page)
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3929044e833b49c28a08cb0e11b84381&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading:true
    // })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({     
    // articles:parsedData.articles,
    // totalResults:parsedData.totalResults,
    // loading:false
    // })
  }
  handlePrevClick= async ()=>{
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3929044e833b49c28a08cb0e11b84381&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading:true
    // })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false})
    await this.setState({
      page:this.state.page-1
    })
    this.updateNews();
    //console.log(this.state.page)
  }
  handleNextClick= async ()=>{
    
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3929044e833b49c28a08cb0e11b84381&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading:true
    // })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page:this.state.page+1,
    //   articles:parsedData.articles,
    //   loading:false})
     await this.setState({
      page:this.state.page+1
    })
    this.updateNews();
    console.log(this.state.page)
  }
  

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-3" key={element.Url} >
            <NewsItem title={element.title?element.title.slice(0,60):" "} description={element.description?element.description.slice(0,120):""} 
            imgUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt.split('T')[0]}
            source={element.source.name}/>
          </div>
          })} 
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
