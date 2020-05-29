import React from "react";
import ImageContainer from "../Component/ImageContainer";
import cs from "classnames";

const API_URL = process.env.REACT_APP_IMAGE_URL;
const IMAGE_INTERVAL = process.env.REACT_APP_IMAGE_INTERVAL;
export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: undefined,
      isPlay: false,
      imageChangedCounter: 0,
      loadedImages: [],
      duplicatedImageCounter: 0,
    };
  }

  fetchData = async () => {
    try {
      const newImg = await fetch(API_URL);
      if (this.state.loadedImages.includes(newImg.url)) {
        this.setState({
          ...this.state,
          url: newImg.url,
          duplicatedImageCounter: this.state.duplicatedImageCounter + 1,
        });
      } else {
        this.setState({
          ...this.state,
          url: newImg.url,
          imageChangedCounter: this.state.imageChangedCounter + 1,
          loadedImages: [...this.state.loadedImages, newImg.url],
        });
      }
    } catch (err) {
      console.error("Error during image url call: " + err);
    }

    setTimeout(() => {
      this.fetchData();
    }, 1000);
  };

  handleClick = () => {
    if (this.state.isPlay) {
      this.setState(() => ({
        ...this.state,
        isPlay: false,
      }));
    } else {
      this.setState(() => ({
        ...this.state,
        isPlay: true,
      }));

      this.fetchData();
    }
  };

  render() {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div
          className='w-4/5 p-8'
          style={{
            minWidth: "750px",
          }}
        >
          <div className='flex justify-around items-center my-8'>
            <div>
              <div className='text-center'>
                {this.state.imageChangedCounter}
              </div>
              <div className='text-xs text-gray-700'>{`new image${
                this.state.imageChangedCounter > 1 ? "s" : ""
              }`}</div>
            </div>
            <div>
              <div className='text-center'>
                {this.state.duplicatedImageCounter}
              </div>
              <div className='text-xs text-gray-700'>{`duplicated image${
                this.state.duplicatedImageCounter > 1 ? "s" : ""
              }`}</div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <ImageContainer url={this.state.url} alt={""} />
          </div>
          <div className='flex justify-center'>
            <button
              className={cs(
                "px-16 py-2  rounded text-white mt-8 focus:outline-none",
                {
                  " bg-green-500": !this.state.isPlay,
                },
                {
                  "bg-gray-500": this.state.isPlay,
                }
              )}
              onClick={this.handleClick}
            >
              {this.state.isPlay ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
