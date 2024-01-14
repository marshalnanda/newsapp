import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description, imgUrl,newsUrl,author,date,source } = this.props;

    return (
      <div className="my-3">
      <div className="card" >
        <span className="position-absolute top-0 start-0 badge rectangle-pill bg-info">{source}</span>
        <img src={!imgUrl ? "https://www.meneame.net/img/logo_meneame_footer.svg" : imgUrl} className="card-img-top" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h6 className="card-title" style={{ height: '50px' }}>{title}...</h6>
          <p className="card-text" style={{ height: '80px' }}>{description}...</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {date}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
    );
  }
}

export default NewsItem;
