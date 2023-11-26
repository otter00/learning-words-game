import React, { useState } from "react";
//import { useContext } from "react";
import "./styles/styles.scss";
import styled from "styled-components";
import AddStringRow from "./styles/AddStringRow.module.scss";
import TableButton from "./styles/TableButton.module.scss";
import cn from "classnames";
import Button from "./Button";
// import { WordsContext } from "../context/ContextProvider";
import axios from "axios";
import { wordsAPI } from "../utils/words_data";

const RowDiv = styled.div`
  margin: auto;
`;

let buttonAdd = cn([
  `${TableButton.buttonAdd}`,
  ` ${TableButton.generalButton}`,
]);

export default function StringRow() {
  const [data, setData] = useState({
    tags: "",
    english: "",
    transcription: "",
    russian: "",
  });
  const [response, setResponse] = useState("");

  // const [lvl, setLevel] = useState("lvl"); //initialize the state
  // const [en, setEnglish] = useState("en");
  // const [tr, setTranscription] = useState("tr");
  // const [ru, setRussian] = useState("ru");

  //let { id } = props;
  //const { addWord } = useContext(WordsContext); //call for function from context

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleButtonAddClick = (event) => {
    // Выводим введенные данные в консоль
    // console.log('Level:', lvl);
    // console.log('English:', en);
    // console.log('Transcription:', tr);
    // console.log('Russian:', ru);
    //create an object contains input values
    //then call for func and send it an object to add new word into API
    // const newWord = {
    //   tags: lvl,
    //   english: en,
    //   transcription: tr,
    //   russian: ru,
    // };
    // console.log(newWord);
    // addWord(id, newWord);

    //event.preventDefault();
    axios
      .post(wordsAPI, data)
      .then((response) => {
        setResponse(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <RowDiv>
      <h1 className={AddStringRow.title}>Add new word</h1>
      <table className={AddStringRow.table}>
        <thead className={AddStringRow.thead}>
          <tr>
            <th>Level</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Russian</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="tags"
                value={data.tags}
                //initialize the state
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <input
                type="text"
                name="english"
                value={data.english}
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <input
                type="text"
                name="transcription"
                value={data.transcription}
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <input
                type="text"
                name="russian"
                value={data.russian}
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <div className={AddStringRow.add__container}>
                <Button
                  className={buttonAdd}
                  name={"Add"}
                  onClick={handleButtonAddClick}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </RowDiv>
  );
}
