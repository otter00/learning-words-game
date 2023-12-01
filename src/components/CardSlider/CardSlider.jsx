import React, { useState, useRef, useCallback, useEffect } from "react";
import "../../styles/styles.scss";
// import components
import Card from "../OneCard/card";
import FinalCard from "../EndOfCard/EndOfCard";
import axios from "axios";
import { wordsAPI } from "../../utils/words_data";

const CardSlider = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [idxWordsTranslated, setIdxWordsTranslated] = useState([]);
  const buttonTranslateRef = useRef(null);
  const [cardWords, setWords] = useState([]);

  useEffect(() => {
    axios
      .get(wordsAPI)
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(cardWords);

  const setButtonTranslateRef = useCallback((node) => {
    if (node) {
      buttonTranslateRef.current = node;
    }
  }, []);

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
        return [...prev, cardIndex];
      }
      return prev;
    });
  }

  const countTranslated = idxWordsTranslated.length;

  if (cardWords) {
    return (
      <>
        {cardIndex < cardWords.length && (
          <>
            <Card
              previousCard={previousCard}
              onClickTranslate={onClickTranslate}
              word={cardWords[cardIndex]}
              nextCard={nextCard}
              ref={setButtonTranslateRef}
            />
            {cardIndex + 1} / {cardWords.length}
          </>
        )}
        {cardIndex === cardWords.length && (
          <>
            <FinalCard
              startSlider={startSlider}
              countTranslated={countTranslated}
            />
          </>
        )}
      </>
    );
  }
  alert("Service is unavailable");
};

export default CardSlider;
