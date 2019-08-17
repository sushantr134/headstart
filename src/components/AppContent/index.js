import React from "react";
import {CenterContainer} from "../../containers/Center";
import {Card} from "../../common/Card";

import styles from './styles.module.scss';
import Chip from '@material-ui/core/Chip'

import arrowLogo from '../../static/images/arrow.png';

export const AppContent = ({data,isLoading}) => {
    var cardHeader = null;
    var cardBody = null;
    var cardFooter = null;
    var ingredientsArr = [];
    return (
        <CenterContainer>
            {
                isLoading ? <p className={styles.loadingText}>Type in Some ingredients you like and we will suggest you nice dishes that use it.</p> :
            <div className={styles.appContentContainer}>
                {
                    data.map((cardObj,index)=>{
                        ingredientsArr = cardObj.ingredients.split(", ");
                        cardHeader = (
                            <div className={styles.cardHeaderWithThumbnail}>
                                <h2>{cardObj.title}</h2>
                                <img src={cardObj.thumbnail} alt={cardObj.title} />
                            </div>

                            );
                          cardBody = (
                              <>
                              <h4>Ingredients</h4>
                                  <div className={styles.ingredientsList}>
                                      {
                                         ingredientsArr.map((item,i) => (
                                             <Chip style={{marginBottom:'0.55em',marginRight:"0.55em"}} key={i} label={item} onDelete={()=>null}/>
                                         ))
                                      }
                                  </div>
                              </>
                          )
                        cardFooter = (
                            <>
                                <a href={cardObj.href} target={"_blank"}>
                                    <button className={styles.ingredientsFooter}>
                                        <span>View Recipe</span>
                                        <span><img src={arrowLogo} alt={"arrowLogo"}/></span>
                                    </button>
                                </a>

                            </>
                        )
                        return (<Card key={index} header={cardHeader} footer={cardFooter} body={cardBody}/>);
                    })
                }
            </div>
            }
        </CenterContainer>
    )
}