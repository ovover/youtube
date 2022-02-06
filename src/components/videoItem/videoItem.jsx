import React, { memo } from 'react';
import styles from './videoItem.module.css';

const VideoItem = memo((props) => (

    // <div onClick={props.onDetail({props.video.id.videoId})}>
    <li className = {styles.video} onClick={() => props.onDetail(props.video)}>    
        <img className = {styles.thumbnails} src={props.video.snippet.thumbnails.medium.url} alt="thumbnails" />
        <div>
            <h3 className = {styles.title}>
                {props.video.snippet.title}
            </h3>
            <span className = {styles.channel}>
                {props.video.snippet.channelTitle}
            </span>
        </div>   
    </li>
));

export default VideoItem;