import React from "react";
import alog from "../DomParser";
import editorContext from "../editorContext";
const parser = new DOMParser();
const ReactCodeonverter = (props) => {
  const { setCodeString } = React.useContext(editorContext);

  let tag = "";
  let options = "";
  const getTags = (tags) => {
    switch (tags.tagName) {
      case "div": {
        tag = `<${tags?.tagName} ${
          tags.className ? `className="${tags.className}"` : ""
        }>
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
        </${tags?.tagName}>\n\t`;
        break;
      }

      case "label": {
        tag = `<${tags.tagName} ${tags.for && `for="${tags.for}"`}>${tags.text}
           ${
             tags.child
               ? tags.child?.map((formChild) => {
                   return getTags(formChild);
                 })
               : ""
           }</${tags.tagName}>\n\t`;
        break;
      }

      case "br": {
        tag = `<${tags.tagName}/>`;
        break;
      }

      case "h1": {
        tag = `<${tags.tagName}>${tags.text}
        ${
          tags?.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
        </${tags.tagName}>\n\t`;
        break;
      }
      case "hr": {
        tag = `<${tags.tagName}/>\n\t`;
        break;
      }

      case "h2": {
        tag = `<${tags.tagName}>${tags.text}
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
        </${tags.tagName}>\n\t`;
        break;
      }

      case "h3": {
        tag = `<${tags.tagName}>${tags.text}
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
      </${tags.tagName}>\n\t`;
        break;
      }

      case "h4": {
        tag = `<${tags.tagName}>${tags.text}
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
      </${tags.tagName}>\n\t`;
        break;
      }

      case "span": {
        tag = `<${tags.tagName}>${tags.text}
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }</${tags.tagName}>\n\t`;
        break;
      }

      case "p": {
        tag = `<${tags.tagName}>${tags.text}
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
      </${tags.tagName}>\n\t`;
        break;
      }

      case "input": {
        tag = `<${tags.tagName}
             type="${tags.type}"
             ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
             ${tags.id ? `value={state.${tags.id}}` : ""}
             ${tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""}
             ${tags?.name ? `name="${tags?.name}"` : ""}
         />\n\t`;
        break;
      }

      case "form": {
        tag = `<${tags?.tagName} onSubmit={handleSubmit}>
        ${
          tags.child
            ? tags.child?.map((formChild) => {
                return getTags(formChild);
              })
            : ""
        }
        </${tags?.tagName}>\n\t`;
        break;
      }

      case "select": {
        tag = `<${tags?.tagName} 
          type="${tags.type}"
          ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
          ${tags.id ? `value={${tags.id}}` : ""}
          ${tags?.name ? `name="${tags?.name}"` : ""}
          ${tags.className ? `className="${tags.className}"` : ""}
        >
        ${
          // tags.child.length <= 10 ?
          `{${tags?.id}option.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}`
          // : ""
        }
        </${tags?.tagName}>\n\t`;
        // return options;
        // ${(options = getOption(tags))}
      }

      default:
    }

    return tag.replaceAll(",", "").replace(/^\s*\n/gm, "");
  };
  const getOption = (tag) => {
    const option = `const ${tag?.id}option = [${tag?.child?.map((options) => {
      return `\n\t\t{ label: "${options?.text}", value: "${options?.value}" }`;
    })}]\n\t`;
    return option;
  };

  // const getOption = (tag) => {
  //   const option = `const ${tag?.id}option = [${tag?.childNodes
  //     ?.map((options) => {
  //       return options?.rawAttrs
  //         ? `\n\t\t{ label: "${options?.text}", value: "${options?.attributes?.value}" }`
  //         : "";
  //     })
  //     .join("")}]\n\t`;

  //   return option;
  // };
  // console.log("output", props);
  const onInputChange = () => {
    const string = `
    import React from 'react';
    import axios from 'axios';

    ${props?.select
      ?.map((childSelect) => {
        const abc = parser.parseFromString(childSelect, "text/html");
        let output = alog([...abc.body.children]);
        return output?.map((select) => {
          return select.child.length > 10
            ? `const ${select.id}optionApi = "Enter Your API here";\n\t`
            : getOption(select);
        });
      })
      .join("")}

    function form(){

      const [state, setState] = React.useState({
        ${props?.input?.map((inputs) => {
          return inputs?.attributes?.name
            ? `\n\t${inputs?.attributes?.name}: ''`
            : "";
        })}
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

      ${props?.output
        ?.map((tags) => {
          return tags?.child
            ?.map((t) => {
              return t.tagName === "select"
                ? t.child.length > 10
                  ? `const ${t.id}callApi = () => {
                  axios
                  .get(${t.id}optionApi)
                  .then((res) => {
                    const data = res?.data
                    setState({ ${t.id}option: data });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                }\n
                React.useEffect(() => {
                  ${t.id}callApi();
                }, []);`
                  : ""
                : "";
            })
            .join("");
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

// let labelTag = `
// ${props?.label?.map(
//   (labels) =>
//     `<${labels.rawTagName} for={${labels.attributes?.for}}></${labels.rawTagName}>`
// )}
// `;
// let inputTag = `
// ${props?.input?.map(
//   (inputs) =>
//     `<${inputs.rawTagName}
//     type={${inputs.attributes?.type}}
//     onChange={handleChange}
//     ${inputs.attributes?.id ? `value={${inputs.attributes?.id}}` : ""}
//     ${inputs.attributes?.name ? `name={${inputs.attributes?.name}}` : ""}
//     />`
// )}
// `;
// let b = inputTag.replaceAll(",", "");
// const string = `
// import React,{useState} from 'react';
// function form(){
//   const [state, setState] = useState({
//     ${props?.input?.map((inputs) => {
//       return inputs?.attributes?.id ? `${inputs?.attributes?.id}: ''` : "";
//     })}
//   });
//   const handleChange = e => {
//     setState({...state, [e.target.name]: e.target.value})
//   }
//   return(
//     <${props?.form?.[0]?.rawTagName} onSubmit={handleSubmit}>
//       ${labelTag}
//       ${b.replace(/^\s*\n/gm, "")}
//     </${props?.form?.[0]?.rawTagName}>
//   );
// }
// `;

// const options = [
//   ${props?.output?.map((tags) => {
//     return tags?.child.map((t) => {
//       return t?.child?.map((options) => {
//         return `{ label: ${options?.text}, value: ${options?.value} }\n`;
//       });
//     });
//   })}
// ];

// const getOption = () => {
//   const option = props.select.map((select) => {
//     return `const ${select?.id}option = [${select.childNodes?.map((child) => {
//       return child?.rawTagName
//         ? `{label: ${child?.text}, value: ${child?.attributes?.value}}\n`
//         : "";
//     })}]`;
//   });
//   return option;
// };

// case "select": {
//   tag = ` ${
//     tags.child.length <= 10
//       ? `<${tags?.tagName}
//     type="${tags.type}"
//     ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
//     ${tags.id ? `value={${tags.id}}` : ""}
//     ${tags?.name ? `name="${tags?.name}"` : ""}
//   >
//     ${tags?.id}option.map((option) => (
//       <option value={option.value}>{option.label}</option>
//     ))}
//   </${tags?.tagName}>`
//       : ""
//   }`;
//   break;
// }

// ${props?.output
//   ?.map((tags) => {
//     return tags?.child
//       ?.map((t) => {
//         return t.tagName === "select"
//           ? t.child.length > 10
//             ? `const ${t.id}optionApi = "Enter Your API here";\n\t`
//             : getOption(t)
//           : "";
//       })
//       .join("");
//   })
//   .join("")}
