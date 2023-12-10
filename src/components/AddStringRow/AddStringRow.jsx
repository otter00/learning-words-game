import React, { useState, useEffect } from "react";
import "../../styles/styles.scss";
import styled from "styled-components";
import AddStringRow from "./AddStringRow.module.scss";
import TableButton from "../CustomButton/TableButton.module.scss";
import cn from "classnames";
import Button from "../CustomButton/Button";
import axios from "axios";
import { wordsAPI } from "../../utils/words_data";

const RowDiv = styled.div`
  margin: auto;
`;

let buttonDisabled = cn([`${TableButton.generalButton__disabled}`]);

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

  const [isEmpty, setIsEmpty] = useState(null);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (
      data.english === "" ||
      data.russian === "" ||
      data.tags === "" ||
      data.transcription === "" ||
      !data.russian.match("[а-яА-ЯЁё]") ||
      !data.english.match("^[a-zA-Z0-9]+$") ||
      !data.tags.match("^[a-zA-Z0-9]+$")
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [data.english, data.russian, data.tags, data.transcription]);

  const handleButtonAddClick = () => {
    // Выводим введенные данные в консоль
    // console.log('Level:', lvl);
    // console.log('English:', en);
    // console.log('Transcription:', tr);

    if (isEmpty) alert("Please, fill all the inputs match to pattern");
    else {
      axios
        .post(wordsAPI, data)
        .then((response) => {
          setResponse(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                placeholder="tags"
                //initialize the state
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <input
                type="text"
                name="english"
                placeholder="english"
                value={data.english}
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <input
                type="text"
                name="transcription"
                placeholder="[transcription]"
                value={data.transcription}
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <input
                type="text"
                name="russian"
                placeholder="перевод"
                value={data.russian}
                onChange={handleChange}
              ></input>
            </td>

            <td>
              <div className={AddStringRow.add__container}>
                <Button
                  className={isEmpty ? `${buttonDisabled}` : `${buttonAdd}`}
                  name={"Add"}
                  onClick={handleButtonAddClick}
                  disabled={isEmpty}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </RowDiv>
  );
}
