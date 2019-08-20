import React from "react";
import styles from './styles.module.scss';
import {CenterContainer} from "../../containers/Center";

import img1 from '../../static/images/img-1.png';
import img2 from '../../static/images/img-2.png';
import img3 from '../../static/images/img-3.png';

export const Header = ({text, subText, children}) => {
    return (
        <CenterContainer style={{background: "#292626"}}>
            <div className={styles.headerContent}>
                <div className={styles.headerLeft}>
                    <h1>{text}</h1>
                    <p>{subText}</p>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.imagesContainer}>
                        <img src={img3} alt={"ime3"}/>
                        <img src={img2} alt={"ima2"}/>
                        <img src={img1} alt={"ima1"}/>
                    </div>
                </div>
            </div>
            <div className={styles.searchWithHeader}>
                {
                    children
                }
            </div>
        </CenterContainer>

    )
};