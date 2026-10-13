import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description,imgUrl,newsUrl,author,date,source}=this.props;

    return (
      <>
      <div className="card" style={{width: "18rem"}}>
         <img src={imgUrl} className="card-img-top" alt="..."/>
         <div className="card-body">
             <h5 className="card-title">{title}...</h5>
             <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'85%', zIndex:1}}>
                {source}
               <span class="visually-hidden">unread messages</span>
             </span>
             <p className="card-text">{description}...</p>
             <p class="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
             <a href={newsUrl} rel='noreferrer'
             target='_blank' className="btn btn-sm btn-primary">Read More</a>
         </div>
      </div>
      </>
    )
  }
}

export default NewsItem

