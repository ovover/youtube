import React, { Component } from 'react';
import styles from './app.module.css';
import Nav from './components/nav/nav';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail/videoDetail';

class App extends Component {

  state = {
    videos : [],
    selectedVideo : "",
    nextPageToken : "",
    nextType : "P",
    query : ""
  }
  componentDidMount(){
    this.handlePopular();
  }

  handleSearch = (query) => {

    console.log("handSearch");

    const q = query ? query : this.state.query ;
    console.log(q);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log(this.state.nextPageToken);
    fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q="+q+`&order=date&key=AIzaSyAQSwXQDemJqNnik1NB_4BrYeN5vIpF1I4&pageToken=${this.state.nextPageToken}`, requestOptions)
      .then(response => response.json())
      .then(result => {

        if(q === this.state.query){
          const videos = this.state.videos.concat(result.items); 
          this.setState({videos});
        }else{
          this.setState({videos : result.items});
        }
        
        this.setState({query : q});
        this.setState({selectedVideo : ""});
        this.setState({nextType : "S"});
        this.setState({nextPageToken : result.nextPageToken});
      })
      .catch(error => console.log('error', error));
  }

  handleDetail = (selectedVideo) => {
    this.setState({selectedVideo});
    window.scrollTo(0, 0);
  }

  handlePopular = () =>{

    console.log("handPop");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyAQSwXQDemJqNnik1NB_4BrYeN5vIpF1I4&pageToken=${this.state.nextPageToken}`, requestOptions)
      .then(response => response.json())
      .then(result => {

        const videos = this.state.videos.concat(result.items);

        this.setState({videos : videos});
        this.setState({nextPageToken : result.nextPageToken});
        this.setState({nextType : "P"});

      })
      .catch(error => console.log('error', error));
  }

  handleAdd = () =>{
    if(this.state.nextType === "P"){
      this.handlePopular();
    }else{
      this.handleSearch();
    }
  }


  render() {
    return (
      <div className={styles.app}>
        <Nav onSearch = {this.handleSearch} />
        <section className={styles.content}>
          {
            this.state.selectedVideo && 
            <div className={styles.detail}>
              <VideoDetail video = {this.state.selectedVideo}/>
            </div> 
          }
          <div className={styles.lists}>
            <VideoList key="test" videos = {this.state.videos} onDetail={this.handleDetail} onAddSearch={this.handleAdd}/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;