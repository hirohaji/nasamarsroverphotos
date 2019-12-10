import React, { Component } from "react";
import RoverChips from "../../components/RoverChips";
import Loading from "../../components/Loading";
import LazyImage from "../../components/LazyImage";
import { displayDate } from "../../components/Date";

import "./styles.css";

export default class Latest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rover: "curiosity",
      date: "",
      camera: "all",
      photos: [],
      isLoading: false,
      hasMore: true,
      error: false
    };
  }

  componentDidMount() {
    this.loadPhotos();
  }

  loadPhotos = () => {
    const { rover } = this.state;
    this.setState({ isLoading: true });
    fetch(`/api/rovers/${rover}/latest_photos`)
      .then(response => {
        response.json().then(responseJson => {
          if (responseJson.latest_photos.length !== 0) {
            this.setState({
              photos: [...responseJson.latest_photos],
              date: responseJson.latest_photos[0].earth_date,
              isLoading: false
            });
          } else {
            this.setState({ hasMore: false, isLoading: false });
          }
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          isLoading: false
        });
      });
  };

  scrollTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  handleRoverChange = changeRover => {
    this.setState(
      {
        photos: [],
        rover: changeRover,
        hasMore: true
      },
      () => {
        this.loadPhotos();
      }
    );
  };

  render() {
    const { rover, date, photos, isLoading, hasMore } = this.state;

    return (
      <div>
        <RoverChips
          rover={rover}
          onRoverChange={this.handleRoverChange}
        />
        <div className="main">
          <div>
            <h1>
              <strong>{rover.toUpperCase()}</strong>
            </h1>
            {date.length > 0 && <h2>Date: {displayDate(date)}</h2>}
          </div>
          <div className="photo-list" id="photo-list">
            {photos.map(photo => (
              <LazyImage
                key={photo.id}
                photo={photo}
                src={photo.img_src}
                alt="placeholder"
              />
            ))}
          </div>
          {!hasMore && (
            <div className="bottom-info">
              <h2>No more photos this day.</h2>
            </div>
          )}
          {isLoading && <Loading />}
          <div className="sidenav">
            <button onClick={this.scrollTop}>&#8679; Back to top</button>
          </div>
        </div>
      </div>
    );
  }
}
