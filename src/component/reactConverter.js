import React from "react";
import alog from "../DomParser";
import editorContext from "../editorContext";
import { pruneEmpty, isEmpty } from "./common";
import getTags from "./getTags";

const parser = new DOMParser();
const ReactCodeonverter = (props) => {
  const { setCodeString } = React.useContext(editorContext);
  let radiokeys = [];

  //defines constants for dropdown
  const getOption = (tag, index) => {
    const option = `const option${
      tag?.id ? tag?.id : index + 1
    } = [${tag?.child?.map((options) => {
      return `\n\t{ label: "${options?.text}", value: "${options?.value}" }`;
    })}]\n\t`;
    return option;
  };

  //creates object for radio constants
  const radio = pruneEmpty(
    props?.inputTags?.map((radioTag) => {
      return (
        radioTag.type === "radio" && {
          id: radioTag?.id,
          name: radioTag?.name,
          value: radioTag?.value,
        }
      );
    })
  );

  //creates object for checkbox constants
  const checkBox = pruneEmpty(
    props?.inputTags?.map((checkBox) => {
      return (
        checkBox.type === "checkbox" && {
          id: checkBox?.id,
          name: checkBox?.name,
          value: checkBox?.value,
        }
      );
    })
  );

  //groups all radio constats by their name
  function groupBy(objectArray, property) {
    const tempVar = [];
    return objectArray?.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }

      // Add object to list for given key's value
      acc[key].push(obj);
      tempVar.push(key);

      // remove duplicate values
      radiokeys = tempVar.filter(function (elem, pos) {
        return tempVar.indexOf(elem) === pos;
      });
      return acc;
    }, {});
  }
  const groupedRadiotag = groupBy(radio, "name");

  //defines radio constants
  const getRadioConst = () => {
    const radioTags = radiokeys
      .map((key) => {
        return `\n\n\tconst ${key}radio = [ ${groupedRadiotag[key].map(
          (x, index) => {
            return `\n\t{id: "${x?.id ? x?.id : `id${index + 1}`}",name: "${
              x?.name
            }", value: "${x?.value}"}`;
          }
        )}]`;
      })
      .join("");
    return radioTags;
  };

  //defines checkbox constants
  const getCheckBox = () => {
    const check = `const checkBox = [${checkBox?.map((cbTag, index) => {
      return `\n\t{id: "${cbTag?.id ? cbTag?.id : `id${index + 1}`}",name: "${
        cbTag?.name
      }", value: "${cbTag?.value}"}`;
    })}]`;
    return check;
  };

  // API function for dropdown morethan 10 options
  const getOptionAPI = (tag, index) => {
    const option = `const callApi${tag.id ? tag.id : index + 1} = () => {
        axios
        .get(${tag.id ? tag.id : index + 1}optionApi)
        .then((res) => {
          const data = res?.data
          setState({ ${tag.id ? tag.id : index + 1}option: data });
        })
       .catch(function (error) {
          console.log(error);
        });
      }\n
      React.useEffect(() => {
         ${tag.id ? tag.id : index + 1}callApi();
      }, []);`;
    return option;
  };

  //useState variables
  const getStateVar = () => {
    const stateVar = props?.inputTags?.map((inputs) => {
      return inputs?.type === "radio"
        ? inputs?.name
          ? `\n\t${inputs?.name}: ""`
          : ""
        : inputs?.type === "checkbox"
        ? ""
        : inputs?.name
        ? `\n\t${inputs?.name}: ""`
        : inputs?.id
        ? `\n\t${inputs?.id}: ""`
        : "";
    });

    var stateArray = stateVar?.filter(function (elem, pos) {
      return stateVar?.indexOf(elem) === pos;
    });

    return pruneEmpty(stateArray);
  };

  //useState variables
  const getOptionvar = () => {
    const optionVar = props?.select
      ?.map((childSelect) => {
        const Tag = parser.parseFromString(childSelect, "text/html");
        let selectTag = alog([...Tag.body.children]);

        return selectTag?.map((select, index) => {
          return select?.child?.length > 10
            ? `\n\toption${select?.id ? select?.id : index + 1}: []`
            : "";
        });
      })
      .join("");

    return optionVar;
  };

  const getSelectvar = () => {
    const optionVar = props?.select?.map((childSelect) => {
      const Tag = parser.parseFromString(childSelect, "text/html");
      let selectTag = alog([...Tag.body.children]);
      return selectTag?.map((select) => {
        return select?.id
          ? `\n\t${select?.id}: ""`
          : select?.name
          ? `\n\t${select?.name}: ""`
          : "";
      });
    });

    return optionVar;
  };

  //checkbox variables
  const getCheckboxvar = () => {
    const stateVar = props?.inputTags?.map((inputs) => {
      return inputs?.type === "checkbox"
        ? inputs?.name
          ? `\n\t${inputs?.name}: ${inputs?.checked ? `true` : `false`}`
          : inputs?.id
          ? `\n\t${inputs?.id}: ${inputs?.checked ? `true` : `false`}`
          : ""
        : "";
    });

    var stateArray = stateVar?.filter(function (elem, pos) {
      return stateVar?.indexOf(elem) === pos;
    });

    return pruneEmpty(stateArray);
  };

  //function for returning whole code
  const onInputChange = () => {
    const string = `
    import React from 'react';
    import axios from 'axios';

    const submitApi = "Enter your submit API"; 
    ${!isEmpty(radio) ? getRadioConst() : ""}
    ${!isEmpty(checkBox) ? getCheckBox() : ""}

    ${props?.select
      ?.map((childSelect) => {
        const Tag = parser.parseFromString(childSelect, "text/html");
        let selectTag = alog([...Tag.body.children]);
        return selectTag?.map((select, index) => {
          return select?.child?.length > 10
            ? `\n\tconst optionApi${
                select?.id ? select?.id : index + 1
              } = "Enter Your options API here";\n\t`
            : getOption(select, index);
        });
      })
      .join("")}

    function Form(){

      const [state, setState] = React.useState({${getStateVar()}${getOptionvar()}${getSelectvar()}
      });

      const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value});
      }; 

      ${
        !isEmpty(checkBox)
          ? `const [checked, setChecked] = React.useState({${getCheckboxvar()}
    });

    const handleToggle = ({ target }) => {
      setChecked((s) => ({ ...s, [target.name]: !s[target.name] }));
    };`
          : ""
      }
      ${props?.inputTags
        ?.map((inputs) => {
          return inputs?.required
            ? inputs?.type === "radio"
              ? `const handle${inputs?.name}=(e)=> {
              var tempVar = e.target.value;
              var error${inputs?.name} = "";
          
              if (!state.${inputs?.name}) {
                error${inputs?.name} = "Please Provide ${inputs?.name} !";
              }
              setState({
                error${inputs?.name}: error${inputs?.name},
              });
            }\n\t`
              : inputs?.type === "checkbox"
              ? `const handle${inputs?.name}=(e)=> {
                  var tempVar = e.target.value;
                  var error${inputs?.name} = "";
              
                  if (tempVar.length === 0) {
                    error${inputs?.name} = "Please Provide ${inputs?.name} !";
                  }
                  setState({
                    error${inputs?.name}: error${inputs?.name},
                  });
                }\n\t`
              : `const handle${inputs?.name}=(e)=> {
              var tempVar = e.target.value;
              var error${inputs?.name} = "";
          
              if (tempVar.length === 0) {
                error${inputs?.name} = "Please Provide ${inputs?.name} !";
              }
              setState({
                error${inputs?.name}: error${inputs?.name},
              });
            }\n\t`
            : "";
        })
        .join("")}
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
          ...state,
          ${!isEmpty(checkBox) ? `...checked,` : ""}
        };
        await axios
          .post(submitApi, { formData })
          .then((res) => {
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      ${props?.select
        ?.map((childSelect) => {
          const Tag = parser.parseFromString(childSelect, "text/html");
          let selectTag = alog([...Tag.body.children]);
          return selectTag?.map((select, index) => {
            return select?.child?.length > 10
              ? getOptionAPI(select, index)
              : "";
          });
        })
        .join("")}

      return(
        ${props?.output
          ?.map((tags) => {
            return getTags(tags, radiokeys, checkBox);
          })
          .join("")}
      );
    }
    export default Form;
    `;

    isEmpty(props?.output) ? setCodeString("") : setCodeString(string);
  };

  return (
    <div>
      <button className="button" onClick={onInputChange}>
        Convert{" "}
      </button>
      <button className="button" onClick={() => setCodeString("")}>
        Clear{" "}
      </button>
    </div>
  );
};

export default ReactCodeonverter;
