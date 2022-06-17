import React from "react";

const defaultContext = {
  markdownText: "",
  setCodeString: () => {},
};

export default React.createContext(defaultContext);
