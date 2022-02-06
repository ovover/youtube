import React from 'react';
import styles from './videoDetail.module.css';

const VideoDetail = (props) => (
    <div className={styles.detail}>
        <iframe 
            id="player" 
            type="text/html" 
            width="640" 
            height="360"
            src={`http://www.youtube.com/embed/${(props.video.kind) === "youtube#video" ? props.video.id : props.video.id.videoId}`}
            frameBorder="0"
            allowFullScreen
        ></iframe>
        <h2>{props.video.snippet.title}</h2>
        <h3>{props.video.snippet.channelTitle}</h3>
        <pre className={styles.description}>{props.video.snippet.description}</pre>
    </div>        
    );

export default VideoDetail;