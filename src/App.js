import React from "react";
import "./App.css";
import HtmlCode from "./component/htmlCode";
import ReactCode from "./component/reactCode";
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
