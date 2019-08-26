import React from "react";
import styles from "./styles.module.scss";

export const LandingPage = ({ searchPanel, animate, children }) => {
  return (
    <div className={`${styles.landingContainer} ${animate && styles.animateContainer}`}>
      {children}
      {searchPanel}
      <p className={`${animate && styles.animatePara}`}>
        Type in Some ingredients you like and we will suggest you nice dishes that use it.
      </p>
    </div>
  );
};
