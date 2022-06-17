import React from "react";
import "./Style/App.css";
import HtmlCode from "./component/Input_Output/htmlCode";
import ReactCode from "./component/Input_Output/reactCode";
import EditorContext from "./editorContext";

function App() {
  const [markdownText, setCodeString] = React.useState("");
  const contextValue = {
    markdownText,
    setCodeString,
  };
  return (
    <EditorContext.Provider value={contextValue}>
      <div className="container">
        <span className="title">Html to React JS</span>
        <div className="EditorContainer">
          <HtmlCode />
          <ReactCode />
        </div>
      </div>
    </EditorContext.Provider>
  );
}

export default App;
