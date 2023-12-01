import Template from "../TemplateTable/TemplateTable";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { wordsAPI } from "../../utils/words_data";

const Loading = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 54px;
  font-weight: 600;
`;

export default function TableWords() {
  const [words, setWords] = useState([]);

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

  if (words.length === 0) {
    return (
      <>
        <Loading>Loading...</Loading>
      </>
    );
  }
  //console.log(words);

  return (
    <>
      <tbody>
        {words.map((word, id) => (
          <Template
            // key & id we get from JSON as id & tags_json
            key={word.id}
            id={word.id} // tags_json
            tags={word.tags}
            english={word.english}
            transcription={word.transcription}
            russian={word.russian}
            name={"Edit"}
          ></Template>
        ))}
      </tbody>
    </>
  );
}
