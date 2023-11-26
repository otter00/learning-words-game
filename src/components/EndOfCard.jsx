import React from 'react';

import './styles/styles.scss';
import ButtonStyle from './styles/Button.module.scss';
import Button from './Button';

export default function EndOfCard(props) {

    return(
        <div className="cards__container">

        <section className="card__content">
            <div className="card__word">
                <span className="card__level">You've learned {props.countTranslated} words</span>
                <span className="bold__word">Congrats!</span>
            </div>
        </section>
        
        <div onClick={props.startSlider}>
        <Button className={ButtonStyle.button} name={'Start again'}/>
        </div>
    </div>
    );
}