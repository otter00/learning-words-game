import React, { useEffect, useState, forwardRef } from "react";
import cn from "classnames";
import "../../styles/styles.scss";

import ButtonStyle from "../CustomButton/Button.module.scss";
import Button from "../CustomButton/Button";
import TableButton from "../CustomButton/TableButton.module.scss";

const buttonTranslate = cn([
  `${TableButton.buttonTranslate}`,
  `${ButtonStyle.button}`,
]);

const Card = forwardRef(function Card(props, setButtonTranslateRef) {
  const [isTranslate, setIsTranslate] = useState(false);
  const { word, onClickTranslate } = props;
  const { tags, transcription, english, russian, id } = word;

  console.log("index is = " + props.cardIndex);

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
            <span onClick={onClickButton} className="word__translation">
              {russian}
            </span>
          )}
          {!isTranslate && (
            <span className="word__translation-button">
              <Button
                className={buttonTranslate}
                name={"Translate"}
                onClick={onClickButton}
                setButtonTranslateRef={setButtonTranslateRef}
              />
            </span>
          )}
        </div>
      </section>

      <div className={ButtonStyle.buttons__container}>
        {props.cardIndex === 0 && (
          <div onClick={props.nextCard}>
            <Button className={ButtonStyle.button} name={"Next"} />
          </div>
        )}
        {props.cardIndex > 0 && (
          <>
            <div onClick={props.previousCard}>
              <Button className={ButtonStyle.button} name={"Previous"} />
            </div>

            <div onClick={props.nextCard}>
              <Button className={ButtonStyle.button} name={"Next"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default Card;
