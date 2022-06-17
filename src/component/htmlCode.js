import React, { useState } from "react";
import "./style.css";
import { parse } from "node-html-parser";
import ReactConverter from "./reactConverter";
import alog from "../DomParser";

const parser = new DOMParser();

let html = "";
let output;

const HtmlCode = () => {
  const [state, setState] = useState({
    formTag: "",
    labelTag: "",
    inputTag: "",
    optionTag: "",
    selectTag: "",
  });

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    html = parser.parseFromString(newValue, "text/html");
    let root = parse(newValue);

    output = alog([...html.body.children]);

    const form = root.getElementsByTagName("form");
    const label = root.getElementsByTagName("label");
    const input = root.getElementsByTagName("input");
    const select = root.getElementsByTagName("select");
    const option = root.getElementsByTagName("option");
    setState({
      formTag: form,
      labelTag: label,
      inputTag: input,
      selectTag: select,
      optionTag: option,
    });
  };

  // console.log("output", output);

  return (
    <div className="subcontainer">
      <div className="title">
        <span>Html</span>
        <ReactConverter
          form={state.formTag}
          option={state.optionTag}
          select={state.selectTag}
          label={state.labelTag}
          input={state.inputTag}
          output={output}
        />
      </div>
      <textarea className="textArea" onChange={onInputChange} />
    </div>
  );
};
export default HtmlCode;
