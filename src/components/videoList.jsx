import React, { memo } from 'react';
import VideoItem from './videoItem/videoItem';


const VideoList = memo((props) => (
    <ul>
        {props.videos.map(video => (
            <VideoItem key = {video.kind === "youtube#video" ? video.id : video.id.videoId} video = {video} onDetail={props.onDetail}/>
        ))}
        <button onClick={props.onAddSearch}>더보기...</button> 
    </ul>

    ));

export default VideoList;
