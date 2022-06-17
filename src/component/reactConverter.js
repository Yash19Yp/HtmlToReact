import React from "react";
import alog from "../DomParser";
import editorContext from "../editorContext";
import getTags from "./getTags";

const parser = new DOMParser();
const ReactCodeonverter = (props) => {
  const { setCodeString } = React.useContext(editorContext);

  const getOption = (tag) => {
    const option = `const ${tag?.id}option = [${tag?.child?.map((options) => {
      return `\n\t\t{ label: "${options?.text}", value: "${options?.value}" }`;
    })}]\n\t`;
    return option;
  };

  const getOptionAPI = (tag) => {
    const option = `const ${tag.id}callApi = () => {
              axios
              get(${tag.id}optionApi)
             .then((res) => {
              const data = res?.data
                  setState({ ${tag.id}option: data });
              })
             .catch(function (error) {
                 console.log(error);
              });
              }\n
              React.useEffect(() => {
               ${tag.id}callApi();
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

    ${props?.select
      ?.map((childSelect) => {
        const Tag = parser.parseFromString(childSelect, "text/html");
        let selectTag = alog([...Tag.body.children]);
        return selectTag?.map((select) => {
          return select?.child?.length > 10
            ? `const ${select?.id}optionApi = "Enter Your API here";\n\t`
            : getOption(select);
        });
      })
      .join("")}

    const radioConst = [ ${props?.input
      ?.map((input) => {
        const Tag = parser.parseFromString(input, "text/html");
        let radioTag = alog([...Tag.body.children]);
        return radioTag.map((radio) => {
          return radio.type === "radio"
            ? `\n\t{id: "${radio?.id}",name: "${radio?.name}", value: "${radio?.value}"},`
            : "";
        });
      })
      .join("")}]

      const checkboxConst = [ ${props?.input
        ?.map((input) => {
          const Tag = parser.parseFromString(input, "text/html");
          let checkboxTag = alog([...Tag.body.children]);
          return checkboxTag.map((check) => {
            return check.type === "checkbox"
              ? `\n\t{id: "${check?.id}",name: "${check?.name}", value: "${check?.value}"},`
              : "";
          });
        })
        .join("")}]

    function form(){

      const [state, setState] = React.useState({
        ${getStateVar()}
        ${props?.output
          ?.map((tags) => {
            return tags?.child
              ?.map((t) => {
                return t.tagName === "select"
                  ? t.child.length > 10
                    ? `${t.id}option: [],\n\t`
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
          return selectTag?.map((select) => {
            return select?.child?.length > 10 ? getOptionAPI(select) : "";
          });
        })
        .join("")}

      return(
        ${props?.output
          ?.map((tags) => {
            return getTags(tags);
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

// ${props?.output
//   ?.map((tags) => {
//     return tags?.child
//       ?.map((t) => {
//         return t.tagName === "select"
//           ? t.child.length > 10
//             ? `const ${t.id}callApi = () => {
//             axios
//             .get(${t.id}optionApi)
//             .then((res) => {
//               const data = res?.data
//               setState({ ${t.id}option: data });
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//           }\n
//           React.useEffect(() => {
//             ${t.id}callApi();
//           }, []);`
//             : ""
//           : "";
//       })
//       .join("");
//   })
//   .join("")}
