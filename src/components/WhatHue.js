import React, { useEffect, useState } from 'react';
import { firestore } from "../fire";
import Select from 'react-select';
import { detect } from 'detect-browser';

const WhatHue = () => {

  const [content, setContent] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

  // Connect to Firestore when the component mounts
  useEffect(() => {
    const unsubscribe = firestore
      .collection("content")
      .doc("content")
      .onSnapshot(snap => {
        setContent(snap.data());
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = e => {
    firestore
      .collection("responses")
      .add({colour: selectedOption.value, browser: detect().name})
      .catch(function (error) {
        console.error(error);
      })
      .then((ref) => {
        setSelectedOption("");
        alert("Thanks for sharing your personal data with us 😘")
      })
    e.preventDefault();
  }

  return (
    <div>
      <h1>{content.title}</h1>
      <div>
        <p>{content.question}</p>
        {content.colours &&
          <form onSubmit={handleSubmit}>
            <Select
              value={selectedOption}
              onChange={(selectedOption) => setSelectedOption(selectedOption)}
              options={content.colours}
            />
            <input type="submit" value="Submit"/>
          </form>
        }
      </div>
    </div>
  );
};

export default WhatHue;