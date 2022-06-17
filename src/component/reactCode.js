import React, { useContext } from "react";
import editorContext from "../editorContext";
import "./style.css";
const ReactCode = (props) => {
  const { markdownText } = useContext(editorContext);
  return (
    <div className="subcontainer">
      <span className="title">React Js</span>
      <textarea className="textArea" disabled value={markdownText} />
    </div>
  );
};
export default ReactCode;
