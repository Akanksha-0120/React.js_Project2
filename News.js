import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes, { string } from 'prop-types'
import Spinner from './Spinner';

export class News extends Component {

    static defaultProps={
        country:"in",
        pageSize:8,
        category:"general",
    };

    PropTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    };

   capitalizeFirstLetter=(string)=>{
       return string.charAt(0).toUpperCase()+string.slice(1);
   };

   constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1
    };

   document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;

  }

  async updateNews(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0303341b353845999a2cd19c2cf2b3c6&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false,
    });
  }  

  async componentDidMount(){ 
    
    /*let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0303341b353845999a2cd19c2cf2b3c6&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false,
    });*/

    this.updateNews();

  }

  handlePreviousClick = async()=>{
    /*let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0303341b353845999a2cd19c2cf2b3c6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    
    this.setState({
     page: this.state.page-1,
     articles:parsedData.articles,
     loading:false,
   });*/

   await this.setState({page:this.state.page-1})
   this.updateNews();

  }

    handleNextClick = async()=>{
    /*if(!(this.state.page+1 > Math.ceil(this.state.totalResults/(this.props.pageSize)))){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0303341b353845999a2cd19c2cf2b3c6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData=await data.json();
       
        this.setState({
          page: this.state.page+1,
          articles:parsedData.articles,
          loading:false
       });*/

       await this.setState({page:this.state.page+1})
       this.updateNews();

    }
    
   

  render() {
    console.log("inside render");
    return (
      <div className='container my-4'>
        <h2 className='text-center' style={{margin: "35px,0px"}}>NewsApp - Top HeadLines from {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}

        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
            return (
            <div className="col-md-3"  key={element.url}>
            <NewsItem
             title={element.title?element.title:""} 
             description={element.description?element.description:""}  
             imgUrl={element.urlToImage}
             newsUrl={element.url}
             author={element.author}
             date={element.publishedAt}
             source={element.source.name}
           />
          </div>
        
         )

        })}
        </div>

        <div className='container d-flex justify-content-between my-4'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button type="button" className="btn btn-secondary" onClick={this.handleNextClick}> Next &rarr;</button>
       </div>

      </div>
    )
  }
} 

export default News






