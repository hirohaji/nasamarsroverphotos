import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import Loading from "../../components/Loading";
import LazyImage from "../../components/LazyImage";
import { displayDate } from "../../components/Date";

import "./styles.css";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rover: "perseverance",
      sol: 0,
      earthDate: "",
      camera: "all",
      photos: [],
      searchBySol: true,
      page: 1,
      isLoading: false,
      hasMore: true,
      error: false
    };

    window.onscroll = () => {
      const {
        loadPhotos: loadPhotos,
        state: { error, isLoading, hasMore }
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        let newPage = this.state.page + 1;
        this.setState({ page: newPage });
        loadPhotos();
      }
    };
  }

  componentDidMount() {
    this.loadPhotos();
  }

  loadPhotos = () => {
    const { rover, sol, earthDate, searchBySol, page } = this.state;
    this.setState({ isLoading: true });
    if (searchBySol) {
      fetch(`/api/rovers/${rover}/photos?sol=${sol}&page=${page}`)
        .then(response => {
          response.json().then(responseJson => {
            if (responseJson.photos.length !== 0) {
              this.setState({
                photos: [...this.state.photos, ...responseJson.photos],
                earthDate: responseJson.photos[0].earth_date,
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
    } else {
      fetch(`/api/rovers/${rover}/photos?earth_date=${earthDate}&page=${page}`)
        .then(response => {
          response.json().then(responseJson => {
            if (responseJson.photos.length !== 0) {
              this.setState({
                photos: [...this.state.photos, ...responseJson.photos],
                sol: responseJson.photos[0].sol,
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
    }
  };

  scrollTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  handleRoverChange = changeRover => {
    this.setState(
      {
        photos: [],
        rover: changeRover,
        page: 1,
        hasMore: true
      },
      () => {
       this.loadPhotos();
      }
    );
  };

  handleSolChange = sol => {
    this.setState(
      {
        photos: [],
        sol: sol,
        page: 1,
        hasMore: true
      },
      () => {
        //this.loadPhotos();
      }
    );
  };

  handleEarthDateChange = earthDate => {
    this.setState(
      {
        photos: [],
        earthDate: earthDate,
        page: 1,
        hasMore: true
      },
      () => {
        //this.loadPhotos();
      }
    );
  };

  handleSearchBySolChange = searchBySol => {
    this.setState(
      {
        photos: [],
        searchBySol: searchBySol,
        hasMore: true
      },
      () => {
        //this.loadPhotos();
      }
    );
  };

  handleCameraChange = camera => {
    this.setState({
      camera: camera
    });
  };

  render() {
    const { rover, sol, earthDate, searchBySol, camera, photos, isLoading, hasMore } = this.state;

    return (
      <div>
        <SearchBar
          rover={rover}
          onRoverChange={this.handleRoverChange}
          sol={sol}
          onSolChange={this.handleSolChange}
          earthDate={earthDate}
          onEarthDateChange={this.handleEarthDateChange}
          searchBySol={searchBySol}
          onSearchBySolChange={this.handleSearchBySolChange}
          camera={camera}
          onCameraChange={this.handleCameraChange}
        />
        <div className="main">
          <div>
            <h1>
              <strong>{rover.toUpperCase()}</strong>
            </h1>
            {earthDate.length > 0 && <h2>Date: {displayDate(earthDate)}</h2>}
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
            <button onClick = { this.scrollTop() }>&#8679; Back to top</button>
          </div>
        </div>
      </div>
    );
  }
}
