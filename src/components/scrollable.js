import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Outer = styled.div`
  width: 100%;
  overflow: scroll;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Inner = styled.div`
  display: inline-flex;
  vertical-align: top;

  & > * {
    flex-shrink: 0;
    scroll-snap-align: ${(p) => p.inline};
  }
`;

const Inline = {
  Start: "start",
  Center: "center",
};

export default function Scrollable({
  children,
  inline = Inline.Center,
  overflow = 2,
  index,
  onChangeIndex,
}) {
  const [internalIndex, setInternalIndex] = useState(null);

  const outerRef = useRef([]);
  const innerRef = useRef([]);

  const refs = useRef([]);
  const overRefs = useRef([]);
  const underRefs = useRef([]);

  const waitForScroll = useRef();

  const size = React.Children.count(children);

  useEffect(() => {
    scrollTo(0, "instant");
    setInternalIndex(0);
  }, []);

  useEffect(() => {
    if (internalIndex !== null && index !== internalIndex) {
      scrollTo(index);
    }
  }, [internalIndex, index]);

  useEffect(() => {
    let ref = outerRef.current;
    ref.addEventListener("scroll", handleScroll);
    return () => {
      ref.removeEventListener("scroll", handleScroll);
    };
  }, [outerRef]);

  function updateActiveIndex() {
    const innerRect = innerRef.current.getBoundingClientRect();
    const outerRect = outerRef.current.getBoundingClientRect();

    const y = innerRect.top + innerRect.height / 2;
    const x =
      inline === Inline.Center
        ? outerRect.left + outerRect.width / 2
        : outerRect.left;

    const elements = document.elementsFromPoint(x, y);
    if (!elements.length) return;

    let overIndex;
    let underIndex;
    let index;

    elements.find((element) => {
      overIndex = overRefs.current.indexOf(element);
      underIndex = underRefs.current.indexOf(element);
      index = refs.current.indexOf(element);
      return overIndex + underIndex + index > -3;
    });

    let activeIndex = index;

    if (overIndex >= 0) {
      activeIndex = overIndex;
      scrollTo(activeIndex, "instant");
    } else if (underIndex >= 0) {
      activeIndex = underIndex;
      scrollTo(activeIndex, "instant");
    }

    if (activeIndex !== internalIndex) {
      setInternalIndex(activeIndex);
      onChangeIndex(activeIndex);
    }
  }

  function getPostionByIndex(index) {
    let element = refs.current[index];

    if (index < 0) {
      element = underRefs.current[size + index];
    } else if (index >= size) {
      element = overRefs.current[index - size];
    }

    return outerRef.current.scrollLeft + element.getBoundingClientRect().left;
  }

  function handleScroll() {
    if (waitForScroll.current) return;

    waitForScroll.current = new Promise((resolve) => {
      let same = 0; // a counter
      let lastPos = null; // last known position;

      requestAnimationFrame(check);

      // this function will be called every painting frame
      // for the duration of the smooth scroll operation
      function check() {
        // check our current position
        const newPos = innerRef.current.getBoundingClientRect().left;

        if (newPos === lastPos) {
          // same as previous
          if (same++ > 2) {
            // if it's more than two frames
            return resolve(); // we've come to an halt
          }
        } else {
          same = 0; // reset our counter
          lastPos = newPos; // remember our current position
        }
        // check again next painting frame
        requestAnimationFrame(check);
      }
    }).then(() => {
      waitForScroll.current = null;
      updateActiveIndex();
    });
  }

  function scrollTo(index, behavior = "smooth") {
    const left = getPostionByIndex(index);
    outerRef.current.scrollTo({ left: left, top: 0, behavior });
  }

  const underChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        key: `under-${i}`,
        ref: (el) => (underRefs.current[i] = el),
        inline,
      });
    }
    return child;
  }).slice(size - (1 + overflow), size);

  const mainChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        key: i,
        ref: (el) => (refs.current[i] = el),
      });
    }
    return child;
  });

  const overChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        key: `over-${i}`,
        ref: (el) => (overRefs.current[i] = el),
      });
    }
    return child;
  }).slice(0, overflow);

  return (
    <Outer ref={outerRef}>
      <Inner ref={innerRef} inline={inline}>
        {underChildren}
        {mainChildren}
        {overChildren}
      </Inner>
    </Outer>
  );
}
