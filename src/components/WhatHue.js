import React, { useEffect, useState } from "react";
import { firestore } from "../fire";
import Select from "react-select";
import { detect } from "detect-browser";

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
      .add({ colour: selectedOption.value, browser: detect().name })
      .catch(function(error) {
        console.error(error);
      })
      .then(ref => {
        setSelectedOption("");
        alert("Thanks for sharing your sensitive personal data with us 😘");
      });
    e.preventDefault();
  };

  return (
    <div className={`whatHue ${selectedOption.value}`}>
      <div className="whatHue-inner">
        <header className="whatHue-header">
          <h1>{content.title}</h1>
        </header>
        {content.colours && (
          <form className="whatHue-form" onSubmit={handleSubmit}>
            <label className="whatHue-label" htmlFor="colorSelect">
              {content.question}
            </label>
            <Select
              className="whatHue-select"
              name="colorSelect"
              value={selectedOption}
              onChange={selectedOption => setSelectedOption(selectedOption)}
              options={content.colours}
            />
            <input className="whatHue-submit" type="submit" value="Submit" />
          </form>
        )}
        <footer className="whatHue-footer">
          a <a href="https://properdesign.co.uk">proper</a> silly thing
        </footer>
      </div>
    </div>
  );
};

export default WhatHue;
