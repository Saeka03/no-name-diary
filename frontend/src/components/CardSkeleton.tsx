import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./CardSkeleton.module.scss";

function CardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i}>
          <div className={styles.line}></div>
          <div className={styles.headSkeleton}>
            <Skeleton />
          </div>
          <Skeleton count={3} />
        </div>
      );
    });
}

export default CardSkeleton;
