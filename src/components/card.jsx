import React, {useEffect, useState, useContext, useRef, forwardRef, useCallback} from 'react';
import cn from 'classnames';
import './styles/styles.scss';

import ButtonStyle from './styles/Button.module.scss';
import Button from './Button';
import TableButton from './styles/TableButton.module.scss';
import CardWordsJson from './CardWords';
import SchoolWords from './SchoolJSON';

import { WordsContext } from "../context/ContextProvider";


//let CardWords = JSON.parse(SchoolWords);
//console.log(CardWords); //array

const buttonTranslate = cn([`${TableButton.buttonTranslate}`, `${ButtonStyle.button}`]);

const Card = forwardRef(function Card(props, setButtonTranslateRef) {
    const [isTranslate, setIsTranslate] = useState(false);
    const {word, onClickTranslate} = props;
    // const {counttransled} = useSelector(state => state.counttransled)
    const {tags, transcription, english, russian, id} = word;

    const context = useContext(WordsContext);
    const words = context.words;
    console.log(words);

    const onClickButton = () => {
        onClickTranslate();
        setIsTranslate(!isTranslate);
    };

    useEffect(() => {
        setIsTranslate(false);
    }, [id]);

      useEffect(() => {
    if (isTranslate && setButtonTranslateRef && setButtonTranslateRef.current) {
        setButtonTranslateRef.current.focus();
    }
  }, [isTranslate, setButtonTranslateRef]);
    
    return (     
        <div className="cards__container">

        <section className="card__content">
            <div className="card__word">
                <span className="card__level">{tags}</span>
                <span className="bold__word">{english}</span>
                <span className="card__topic">{transcription}</span>
                {isTranslate && (
                        <span onClick={onClickButton} className="word__translation">{russian}</span>
                )} 
                {!isTranslate && (
                    <span className="word__translation-button">
                    <Button 
                    className={buttonTranslate} 
                    name={'Translate'} 
                    onClick={onClickButton}
                    setButtonTranslateRef={setButtonTranslateRef} />
                    </span>
                )}
            </div>
        </section>

        <div className={ButtonStyle.buttons__container}>
        <div onClick={props.previousCard}>
            <Button className={ButtonStyle.button} 
            name={'Previous'}/>
        </div>
        
        <div onClick={props.nextCard}>
        <Button className={ButtonStyle.button} 
        name={'Next'}/>
        </div>
        </div>
    </div>
    )
})

export default Card;