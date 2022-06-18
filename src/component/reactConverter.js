import React from "react";
import alog from "../DomParser";
import editorContext from "../editorContext";
import { pruneEmpty, isEmpty } from "./common";
import getTags from "./getTags";

const parser = new DOMParser();
const ReactCodeonverter = (props) => {
  const { setCodeString } = React.useContext(editorContext);
  let radiokeys = [];

  const getOption = (tag, index) => {
    const option = `const ${
      tag?.id ? tag?.id : index + 1
    }option = [${tag?.child?.map((options) => {
      return `\n\t{ label: "${options?.text}", value: "${options?.value}" }`;
    })}]\n\t`;
    return option;
  };

  const radio = pruneEmpty(
    props?.radioTag?.map((radioTag) => {
      return (
        radioTag.type === "radio" && {
          id: radioTag?.id,
          name: radioTag?.name,
          value: radioTag?.value,
        }
      );
    })
  );

  const checkBox = pruneEmpty(
    props?.radioTag?.map((checkBox) => {
      return (
        checkBox.type === "checkbox" && {
          id: checkBox?.id,
          name: checkBox?.name,
          value: checkBox?.value,
        }
      );
    })
  );

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
  console.log("boc", checkBox);
  const getCheckBox = () => {
    const check = `const checkBox = [${checkBox?.map((cbTag, index) => {
      return `\n\t{id: "${cbTag?.id ? cbTag?.id : `id${index + 1}`}",name: "${
        cbTag?.name
      }", value: "${cbTag?.value}"}`;
    })}]`;
    return check;
  };

  const getOptionAPI = (tag, index) => {
    const option = `const ${tag.id ? tag.id : index + 1}callApi = () => {
              axios
              get(${tag.id ? tag.id : index + 1}optionApi)
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

  const getStateVar = () => {
    const stateVAr = props?.input?.map((inputs) => {
      return inputs?.attributes?.name
        ? `\n\t${inputs?.attributes?.name}: ""`
        : "";
    });

    var stateArray = stateVAr.filter(function (elem, pos) {
      return stateVAr.indexOf(elem) === pos;
    });

    return stateArray;
  };

  const onInputChange = () => {
    const string = `
    import React from 'react';
    import axios from 'axios';

    ${!isEmpty(radio) ? getRadioConst() : ""}
    ${!isEmpty(checkBox) ? getCheckBox() : ""}

    ${props?.select
      ?.map((childSelect) => {
        const Tag = parser.parseFromString(childSelect, "text/html");
        let selectTag = alog([...Tag.body.children]);
        return selectTag?.map((select, index) => {
          return select?.child?.length > 10
            ? `const ${
                select?.id ? select?.id : index + 1
              }optionApi = "Enter Your API here";\n\t`
            : getOption(select, index);
        });
      })
      .join("")}

    function form(){

      const [state, setState] = React.useState({
        ${getStateVar()}
        ${props?.output
          ?.map((tags) => {
            return tags?.child
              ?.map((t, index) => {
                return t.tagName === "select"
                  ? t.child.length > 10
                    ? `${t.id ? t.id : index + 1}option: [],\n\t`
                    : ""
                  : "";
              })
              .join("");
          })
          .join("")}
      });

      const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
      } 

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
            return getTags(tags, radiokeys, groupedRadiotag);
          })
          .join("")}
      );
    }
    export default form;
    `;
    setCodeString(string);
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

// const checkboxConst = [ ${props?.input
//   ?.map((input) => {
//     const Tag = parser.parseFromString(input, "text/html");
//     let checkboxTag = alog([...Tag.body.children]);
//     return checkboxTag.map((check) => {
//       return check.type === "checkbox"
//         ? `\n\t{id: "${check?.id}",name: "${check?.name}", value: "${check?.value}"},`
//         : "";
//     });
//   })
//   .join("")}]
