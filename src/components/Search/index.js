import React from "react";

import styles from './styles.module.scss';
import {Button} from "../../common/Button";

export const Search = (props) => {
    return (
        <div className={styles.innerSearchContainer}>
        <input type={"text"} value={props.defaultValue} onChange={(event)=>props.onChangeHandleSearch(event)} placeholder={"Try Onions, Garlic ..."}/>
        <Button type={"submit"} className={styles.buttonInnerSearch} onClick={(event)=>props.onclickLoad(event)} text={"Search"} />
        </div>
    )
}