import React, { useRef } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: calc(100% + 2px);
  margin-left: -1px;
  object-fit: cover;
`;

const Placeholder = styled.div`
  background-color: green;
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
      {inView ? (
        <Video loop={true} muted ref={videoRef} playsInline autoPlay>
          <source src={file.url} type={file.contentType} />
        </Video>
      ) : (
        <Placeholder />
      )}
    </VideoWrapper>
  );
}
