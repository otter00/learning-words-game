import { createContext, useState, useEffect } from "react";

export const WordsContext = createContext();

export const ContextProvider = ({ children }) => {
  const [words, setWords] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function loadData() {
    setIsLoading(true);
    try {
      fetch("http://itgirlschool.justmakeit.ru/api/words")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error while loading");
          }
        })
        .then((data) => {
          setIsLoading(false);
          setWords(data);
        });
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  // addWord = async (id, newWord) => {
  //   this.isLoading = true;

  //   try {
  //     const response = await fetch(
  //       `http://itgirlschool.justmakeit.ru/api/words/${id}/add`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newWord),
  //       }
  //     );

  //     if (response.ok) {
  //       runInAction(() => {
  //         this.words.push(newWord);
  //       });
  //     } else {
  //       throw new Error("Try again");
  //     }
  //   } catch (error) {
  //     runInAction(() => {
  //       this.error = error;
  //     });
  //     return "Failed to add word";
  //   } finally {
  //     runInAction(() => {
  //       this.isLoading = false;
  //     });
  //   }
  // };

  async function addWord(id, newWord) {
    console.log("addWord");
    try {
      fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/add`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Try again");
          }
        })
        .then((data) => {
          setIsLoading(false);
          setWords((prevWords) => [...prevWords, data]);
        });
    } catch (error) {
      setIsLoading(false);
      setError(error);
      return "Fail to add word";
    }
    loadData();
  }

  async function editWord(id, newWord) {
    console.log("edited");

    try {
      fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Try again");
          }
        })
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          setWords((prevWords) => [...prevWords, data]);
        });
    } catch (error) {
      setIsLoading(false);
      setError(error);
      return "Fail to edit the word";
    }
  }

  // function to delete word from the table
  // id - wordId, newWord - information of word (ru, en, etc)
  async function deleteWord(id, newWord) {
    console.log("deleted");

    try {
      // get word from the api with its id
      fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord), // convert text to json
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Try again");
          }
        })
        .then((data) => {
          setIsLoading(false);
          // filter the list of words
          // retain only the words with another id
          // if id mathes with id from the list, delete mathed word
          setWords((prevWords) => prevWords.filter((word) => word.id !== id));
        });
    } catch (error) {
      setIsLoading(false);
      setError(error);
      return "Fail to delete the word";
    }
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  //analogue if(isLoading)
  {
    isLoading && <p>Loading...</p>;
  }
  {
    error && <p>{`Ooops, error occured: ${error.message}`}</p>;
  }

  // set context funcs to variable to export
  const values = { words, deleteWord, editWord, addWord };

  // В контексте ContextProvider children представляет собой все дочерние компоненты
  // которые передаются внутрь ContextProvider в структуре JSX
  return (
    <WordsContext.Provider value={values}>{children}</WordsContext.Provider>
  );
};
