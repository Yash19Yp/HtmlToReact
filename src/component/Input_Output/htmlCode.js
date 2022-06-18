import React, { useState } from "react";
import "../../Style/style.css";
import { parse } from "node-html-parser";
import ReactConverter from "../reactConverter";
import alog from "../../DomParser";

const parser = new DOMParser();

let html = "";
let output;
let radioTag;
const HtmlCode = () => {
  const [state, setState] = useState({
    formTag: "",
    labelTag: "",
    inputTag: "",
    optionTag: "",
    selectTag: "",
    radioTag: "",
  });

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    html = parser.parseFromString(newValue, "text/html");
    let root = parse(newValue);

    output = alog([...html.body.children]);

    const form = root.getElementsByTagName("form");
    const label = root.getElementsByTagName("label");
    const input = root.getElementsByTagName("input");
    const Tag = parser.parseFromString(input, "text/html");
    radioTag = alog([...Tag.body.children]);
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
          radioTag={radioTag}
        />
      </div>
      <textarea className="textArea" onChange={onInputChange} />
    </div>
  );
};
export default HtmlCode;
