import React, {useState, useRef, useCallback, useContext} from 'react';
import './styles/styles.scss';
// import components
import Card from './card';
import FinalCard from './EndOfCard';
import JsonWords from "./CardWords";
import SchoolJson from './SchoolJSON';
import { WordsContext } from "../context/ContextProvider";

//let words = JSON.parse(SchoolJson);

const CardSlider = () => {
    const [cardIndex, setCardIndex] = useState(0);
    const [idxWordsTranslated, setIdxWordsTranslated] = useState([]);
    
    const buttonTranslateRef = useRef(null);

    const context = useContext(WordsContext);
    const words = context.words;
    console.log(words);

    const setButtonTranslateRef = useCallback((node) => {
    if (node) {
        buttonTranslateRef.current = node;
    }}, []);

    function nextCard() {
        if (buttonTranslateRef.current) {
            buttonTranslateRef.current.focus();
        }
        setCardIndex(cardIndex + 1);
    }

    function previousCard() {
        setCardIndex(cardIndex - 1);
    }

    function startSlider() {
        setCardIndex(0);
        setIdxWordsTranslated([]);
    }

    function onClickTranslate() {
        setIdxWordsTranslated((prev) => {
            if (!idxWordsTranslated.includes(cardIndex)) {
                return [
                    ...prev,
                    cardIndex
                ]
            }
            return prev;
        })
    }

    const countTranslated = idxWordsTranslated.length;

    if(words) {
        return(
            <>
                {cardIndex < words.length && (
                    <>
                        <Card 
                        previousCard={previousCard} 
                        onClickTranslate={onClickTranslate} 
                        word={words[cardIndex]} 
                        nextCard={nextCard}
                        ref={setButtonTranslateRef}
                        />
                        {cardIndex + 1} / {words.length}
                    </>
                    )}
                {cardIndex === words.length && (
                    <>
                        <FinalCard 
                        startSlider={startSlider} 
                        countTranslated={countTranslated}/>
                    </>
                    )}
            </>
        )
    }
    alert("Service is unavailable");
}

export default CardSlider;