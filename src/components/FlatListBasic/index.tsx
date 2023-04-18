import React, { useRef, useState } from "react";

import classes from "./FlatListBasic.module.css";

interface IProps {
  images: { id: string | number; src: string }[];
}

const FlatListBasic = ({ images }: IProps): JSX.Element => {
  const [arrowDisable, setArrowDisable] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHorizantalScroll = (
    element: HTMLDivElement | null,
    speed: number,
    distance: number,
    step: number
  ) => {
    if (!element) return;
    let scrollAmount = 0;

    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <div className="w-[700px] relative">
      <button
        onClick={() => {
          handleHorizantalScroll(containerRef.current, 25, 100, -10);
        }}
        disabled={arrowDisable}
        className="absolute top-[37%] left-[16px] w-8 h-8 bg-slate-400 rounded-md"
      >{`<<<`}</button>
      <div
        ref={containerRef}
        className={`whitespace-nowrap overflow-auto w-[600px] mx-auto ${classes.FlatList}`}
      >
        {images.map(({ id, src }) => (
          <div key={id} className="w-[200px] inline-block mx-2">
            <img src={src} className="w-full" />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          handleHorizantalScroll(containerRef.current, 25, 100, 10);
        }}
        className="absolute w-8 h-8 top-[37%] right-[16px] bg-slate-400 rounded-md"
      >{`>>>`}</button>
    </div>
  );
};

export default FlatListBasic;
