import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const playPause = async () => {
      if (videoRef.current) {
        console.log("videoRef.current", videoRef.current, inView);
        if (inView && videoRef.current) {
          try {
            await videoRef.current.play();
          } catch {}
        } else {
          try {
            await videoRef.current.pause();
          } catch {}
        }
      }
    };
    playPause();
  }, [inView]);

  return (
    <VideoWrapper ref={ref}>
      <Video ref={videoRef} loop={true} muted playsInline>
        <source src={file.url} type={file.contentType} />
      </Video>
    </VideoWrapper>
  );
}
