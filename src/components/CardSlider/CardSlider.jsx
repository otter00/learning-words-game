import React, { useState, useRef, useCallback, useEffect } from "react";
import "../../styles/styles.scss";
// import components
import Card from "../OneCard/card";
import FinalCard from "../EndOfCard/EndOfCard";
import axios from "axios";
import { wordsAPI } from "../../utils/words_data";
import HomePage from "../HomePage/Home";

const CardSlider = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [idxWordsTranslated, setIdxWordsTranslated] = useState([]);
  const buttonTranslateRef = useRef(null);
  const [cardWords, setWords] = useState([]);

  // get words from API when component is mount
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
    // через свойство current получаем объект, на котором сосредоточились
    if (buttonTranslateRef.current) {
      buttonTranslateRef.current.focus();
    }
    setCardIndex(cardIndex + 1);
  }

  function previousCard() {
    setCardIndex(cardIndex - 1);
  }

  function startSlider() {
    // начальная карточка (старт) - с индексом 0
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

  // функции next & previous зависят от полученного индекса элемента
  // в зависимости от этого индекса в объект word передаётся объект массива слов
  // со значениями, соответствующими этому индексу
  console.log(cardIndex);
  if (cardWords) {
    return (
      <>
        {/* {cardIndex < 0 && (
          <>
            <HomePage></HomePage>
          </>
        )} */}
        {cardIndex < cardWords.length && (
          <>
            <Card
              cardIndex={cardIndex}
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
