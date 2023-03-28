import React, { ComponentProps } from "react";

import { ISummaryItem } from "../../types";
import { classnames } from "../../lib";
import styles from "./ArticleSummary.module.css";

interface IProps extends Omit<ComponentProps<"div">, "children"> {
  item: ISummaryItem;
}

const ArticleSummary = ({
  item,
  className,
  ...restDivProps
}: IProps): JSX.Element => {
  const { title, description, image } = item;

  return (
    <div
      className={classnames(styles.ArticleSummary, className)}
      {...restDivProps}
    >
      <div className={styles.ArticleSummaryImageBox}>
        <img
          src={image.url}
          alt={title}
          width={image.height}
          height={image.width}
          className={styles.ArticleSummaryImage}
        />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ArticleSummary;
