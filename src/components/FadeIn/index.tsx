import React, { useState, useEffect } from "react";

import "./FadeIn.css";

interface IProps {
  children: React.ReactNode;
  show: boolean;
}

const FadeIn = ({ children, show }: IProps): JSX.Element | null => {
  const [render, setRender] = useState(() => show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return render ? (
    <div
      style={{
        animation: `${show ? "fadeIn" : "fadeOut"} 1s`,
        position: "relative",
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  ) : null;
};

export default FadeIn;
