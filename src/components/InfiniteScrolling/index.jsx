import React, { Component } from "react";
// import axios from "axios";
import { client } from '../../api/client';

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 1,
      prevY: 0
    };
  }

  async getPhotos(page) {
    this.setState({ loading: true });
    console.log(this.state.page);
    await client
      .get('curated', {
        params: {
          per_page: 10,
          page: page
        }
      })
      .then(res => {
        this.setState({ photos: [...this.state.photos, ...res.data.photos] });
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.getPhotos(this.state.page);
    console.log(this.state.loading);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPhoto = this.state.photos[this.state.photos.length - 1];
      this.setState( {page: this.state.page + 1})
      this.getPhotos(this.state.page);
      // this.setState({ page: this.curPage });
    }
    this.setState({ prevY: y });
  }

  render() {

    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <div style={{ minHeight: "800px" }}>
          {this.state.photos.map(photo => (
            <img src={photo.src.original} height="100px" width="200px" />
          ))}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default ScrollComponent;

