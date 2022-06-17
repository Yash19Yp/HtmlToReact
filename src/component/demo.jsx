import React from "react";
import editorContext from "../editorContext";

const ReactCodeonverter = (props) => {
  const { setCodeString } = React.useContext(editorContext);

  let tag = "";

  const getTags = (tags) => {
    switch (tags.tagName) {
      case "label": {
        tag = `<${tags.tagName} ${tags.for && `for={${tags.for}}`}>${
          tags.text
        }</${tags.tagName}>`;
        break;
      }

      case "br": {
        tag = `<${tags.tagName}/>`;
        break;
      }

      case "h1": {
        tag = `<${tags.tagName}>${tags.text}</${tags.tagName}>`;
        break;
      }

      case "h2": {
        tag = `<${tags.tagName}>${tags.text}</${tags.tagName}>`;
        break;
      }

      case "p": {
        tag = `<${tags.tagName}>${tags.text}</${tags.tagName}>`;
        break;
      }

      case "input": {
        tag = `<${tags.tagName}
             type={${tags.type}}
             ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
             ${tags.id ? `value={${tags.id}}` : ""}
             ${tags?.name ? `name={${tags?.name}}` : ""}
         />`;
        break;
      }

      case "form": {
        tag = `<${tags?.tagName} onSubmit={handleSubmit}>
        ${tags.child.map((formChild) => {
          return getTags(formChild);
        })}
        </${tags?.tagName}>`;
        break;
      }

      case "select": {
        tag = `<${tags?.tagName} 
          type="${tags.type}"
          ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
          ${tags.id ? `value={${tags.id}}` : ""}
          ${tags?.name ? `name={${tags?.name}}` : ""}
        >
        ${
          tags.child.length <= 10
            ? `{options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}`
            : ""
        }
        </${tags?.tagName}>`;
        break;
      }

      default:
    }

    return tag.replaceAll(",", "").replace(/^\s*\n/gm, "");
  };

  const getOption = () => {
    const option = props.select.map((select) => {
      return `const ${select?.id}option = [${select.childNodes?.map((child) => {
        return child?.rawTagName
          ? `{label: ${child?.text}, value: ${child?.attributes?.value}}\n`
          : "";
      })}]`;
    });
    return option;
  };

  console.log("child", props.output);

  const onInputChange = () => {
    const string = `
    import React,{useState} from 'react';
    ${getOption()}
    function form(){
      const [state, setState] = useState({
        ${props?.input?.map((inputs) => {
          return inputs?.attributes?.id ? `${inputs?.attributes?.id}: ''` : "";
        })}
      });
      const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
      }
      return(
        ${props?.output?.map((tags) => {
          return getTags(tags);
        })}
      );
    }
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
