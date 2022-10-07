import React, { useRef } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  width: calc(100% + 2px);
  margin-left: -1px;
  object-fit: cover;
`;

export default function VideoSlide({ video }) {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const file = video.source.file;

  // if (videoRef.current) {
  //   if (inView && videoRef.current) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.pause();
  //   }
  // }

  return (
    <VideoWrapper ref={ref}>
      <Video loop={true} muted ref={videoRef} playsInline autoPlay>
        <source src={file.url} type={file.contentType} />
      </Video>
    </VideoWrapper>
  );
}
