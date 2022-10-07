import React, { useRef, useState, useEffect, useCallback } from "react";
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

  const getPostionByIndex = useCallback(
    (index) => {
      let element = refs.current[index];

      if (index < 0) {
        element = underRefs.current[size + index];
      } else if (index >= size) {
        element = overRefs.current[index - size];
      }

      return outerRef.current.scrollLeft + element.getBoundingClientRect().left;
    },
    [size]
  );

  const scrollTo = useCallback(
    (index, behavior = "smooth") => {
      const left = getPostionByIndex(index);
      outerRef.current.scrollTo({ left: left, top: 0, behavior });
    },
    [getPostionByIndex]
  );

  const updateActiveIndex = useCallback(() => {
    if (internalIndex === null) {
      setInternalIndex(index);
      return;
    }

    const innerRect = innerRef.current.getBoundingClientRect();
    const outerRect = outerRef.current.getBoundingClientRect();

    const y = innerRect.top + innerRect.height / 2;
    const x =
      inline === Inline.Center
        ? outerRect.left + outerRect.width / 2
        : outerRect.left;

    const elements = document.elementsFromPoint(x, y);

    if (!elements.length) return;

    let mainIndex;
    let overIndex;
    let underIndex;

    elements.find((element) => {
      overIndex = overRefs.current.indexOf(element);
      underIndex = underRefs.current.indexOf(element);
      mainIndex = refs.current.indexOf(element);
      return overIndex + underIndex + mainIndex > -3;
    });

    let activeIndex = mainIndex;

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
  }, [inline, index, internalIndex, onChangeIndex, scrollTo]);

  const handleScroll = useCallback(() => {
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
  }, [innerRef, waitForScroll, updateActiveIndex]);

  useEffect(() => {
    scrollTo(0, "instant");
    setInternalIndex(0);
  }, [scrollTo]);

  useEffect(() => {
    if (internalIndex !== null && index !== internalIndex) {
      scrollTo(index);
    }
  }, [internalIndex, index, scrollTo]);

  useEffect(() => {
    let ref = outerRef.current;
    ref.addEventListener("scroll", handleScroll);
    return () => {
      ref.removeEventListener("scroll", handleScroll);
    };
  }, [outerRef, handleScroll]);

  const underChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        key: `under-${i}`,
        ref: (el) => (underRefs.current[i] = el),
      });
    }
    return child;
  }).slice(size - overflow, size);

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
