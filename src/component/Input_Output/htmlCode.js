import React, { useState } from "react";
import "../../Style/style.css";
import { parse } from "node-html-parser";
import ReactConverter from "../reactConverter";
import alog from "../../DomParser";

const parser = new DOMParser();

let output;
let inputTag;

const HtmlCode = () => {
  const [state, setState] = useState({
    selectTag: "",
  });

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;

    let html = parser.parseFromString(newValue, "text/html");
    output = alog([...html.body.children]); // contains whole body parsed content

    let root = parse(newValue); //For parshing html content
    const input = root.getElementsByTagName("input"); //Takes all input tags
    const Tag = parser.parseFromString(input, "text/html"); // Takes all html elements
    inputTag = alog([...Tag.body.children]);

    const select = root.getElementsByTagName("select"); //Takes all select tags

    setState({ selectTag: select });
  };

  return (
    <div className="subcontainer">
      <div className="title">
        <span>Html</span>
        <ReactConverter
          select={state.selectTag}
          output={output}
          inputTags={inputTag}
        />
      </div>
      <textarea className="textArea" onChange={onInputChange} />
    </div>
  );
};
export default HtmlCode;
