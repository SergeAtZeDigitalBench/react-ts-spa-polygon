import React, { useState, ComponentProps } from "react";

import { classnames } from "../../lib";
import styles from "./Carousel.module.css";

interface ICarouselItemProps extends ComponentProps<"div"> {
  width?: number | string;
}

const CarouselItem = ({
  children,
  width = "100%",
  style,
  className,
  ...restDivProps
}: ICarouselItemProps) => (
  <div
    className={classnames(styles.CarouselItem, className)}
    style={{ width, ...style }}
    {...restDivProps}
  >
    {children}
  </div>
);

interface IProps {
  children: React.ReactElement[];
  itemsPerView?: number;
}

const Carousel = ({ children, itemsPerView = 1 }: IProps): JSX.Element => {
  if (itemsPerView < 1) {
    itemsPerView = 1;
  }

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const childrenCount = React.Children.count(children);
  const itemWidth = 100 / itemsPerView;

  const handlePrev = () => {
    setActiveIndex((current) => {
      const next = current - 1;
      if (next < 0) return 0;

      return next;
    });
  };

  const handleNext = () => {
    setActiveIndex((current) => {
      const isLastInView = current + itemsPerView === childrenCount;
      if (isLastInView) return current;

      return current + 1;
    });
  };

  return (
    <div className={styles.Carousel}>
      <div
        className={styles.CarouselInner}
        style={{
          transform: `translateX(-${activeIndex * itemWidth}%)`,
        }}
      >
        {React.Children.map(children, (currentChild: React.ReactElement) => {
          return React.cloneElement(currentChild, {
            width: `${itemWidth}%`,
          });
        })}
      </div>
      {/* <div className={styles.CarouselIndicators}> */}
      <button
        onClick={handlePrev}
        className={classnames(
          styles.CarouselIndicatorsControlButton,
          styles.Prev
        )}
        disabled={activeIndex === 0}
      >
        prev
      </button>
      <button
        onClick={handleNext}
        className={classnames(
          styles.CarouselIndicatorsControlButton,
          styles.Next
        )}
        disabled={activeIndex + itemsPerView === childrenCount}
      >
        next
      </button>
      {/* </div> */}
    </div>
  );
};

Carousel.Item = CarouselItem;

export default Carousel;
