import { isEmpty } from "./common";

// returns react component
export default function getTags(tags, radiokeys, checkBox) {
  let tag = "";

  switch (tags.tagName) {
    case "input": {
      switch (tags.type) {
        case "text": {
          tag = `\n\t<${tags.tagName}
            ${tags.className ? `className="${tags.className}"` : ""}
            type="${tags.type}"
            onChange={handleChange}
            ${tags.id ? `value={state.${tags.id}}` : ""}
            ${tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""}
            ${tags?.name ? `name="${tags?.name}"` : ""}
            ${tags?.min ? `min="${tags?.min}"` : ""}
            ${tags?.max ? `max="${tags?.max}"` : ""}
         />`;
          break;
        }

        case "email": {
          tag = `<${tags.tagName}
            ${tags.className ? `className="${tags.className}"` : ""}
            type="${tags.type}"
            onChange={handleChange}
            ${tags.id ? `value={state.${tags.id}}` : ""}
            ${tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""}
            ${tags?.name ? `name="${tags?.name}"` : ""}
          />\n\t\t`;
          break;
        }

        case "date": {
          tag = `<${tags.tagName}
            ${tags.className ? `className="${tags.className}"` : ""}
            type="${tags.type}"
            onChange={handleChange}
            ${tags.id ? `value={state.${tags.id}}` : ""}
            ${tags?.name ? `name="${tags?.name}"` : ""}
            ${tags?.min ? `min="${tags?.min}"` : ""}
            ${tags?.max ? `max="${tags?.max}"` : ""}
          />\n\t\t`;
          break;
        }

        case "number": {
          tag = `<${tags.tagName}
                    ${tags.className ? `className="${tags.className}"` : ""}
                    type="${tags.type}"
                    onChange={handleChange}
                    ${tags?.id ? `value={state.${tags?.id}}` : ""}
                    ${tags?.name ? `name="${tags?.name}"` : ""}
                    ${tags?.min ? `min="${tags?.min}"` : ""}
                    ${tags?.max ? `max="${tags?.max}"` : ""}
                   />\n\t\t`;
          break;
        }

        case "password": {
          tag = `<${tags.tagName}
                    ${tags.className ? `className="${tags.className}"` : ""}
                    type="${tags.type}"
                    onChange={handleChange}
                    ${tags.id ? `value={state.${tags.id}}` : ""}
                    ${
                      tags?.placeholder
                        ? `placeholder="${tags?.placeholder}"`
                        : ""
                    }
                    ${tags?.name ? `name="${tags?.name}"` : ""}
                 />\n\t\t`;
          break;
        }

        case "file": {
          tag = `<${tags.tagName}${
            tags.className ? `className="${tags.className}"` : ""
          }
                    type="${tags.type}"
                    onChange={handleChange}
                    ${tags.id ? `value={state.${tags.id}}` : ""}
                    ${tags?.name ? `name="${tags?.name}"` : ""}
                    ${tags?.multiple ? "multiple" : ""}
                />\n\t\t`;
          break;
        }

        case "button": {
          tag = `<${tags.tagName}
                    ${tags.className ? `className="${tags.className}"` : ""}
                    type="${tags.type}"
                    ${tags.value ? `value="${tags.value}"` : ""}
                    ${tags?.name ? `name="${tags?.name}"` : ""}
                />\n\t\t`;
          break;
        }

        case "submit": {
          tag = `<${tags.tagName}
                  type="${tags.type}"
                  ${tags.className ? `className="${tags.className}"` : ""}
                  ${tags.value ? `value="${tags.value}"` : ""}
                  ${tags?.name ? `name="${tags?.name}"` : ""}
               />\n\t\t`;
          break;
        }

        case "radio": {
          // tag = `<${tags.tagName}
          //           type="${tags.type}"
          //           ${tags?.id ? `id="${tags?.id}"` : ""}
          //           ${tags.value ? `value="${tags.value}"` : ""}
          //           ${tags?.name ? `name="${tags?.name}"` : ""}
          //           ${tags?.checked ? `checked={${tags.checked}}` : ""}
          //           onChange={handleChange}
          //        />\n\t\t`;
          break;
        }
        case "checkbox": {
          // tag = `<${tags.tagName}
          //   type="${tags.type}"
          //   ${tags?.id ? `id="${tags?.id}"` : ""}
          //   ${tags.value ? `value="${tags.value}"` : ""}
          //   ${tags?.name ? `name="${tags?.name}"` : ""}
          //   ${tags?.checked ? `checked={${tags.checked}}` : ""}
          //   onChange={handleToggle}
          // />\n\t`;
          break;
        }

        case "reset": {
          tag = `<${tags.tagName}
                    type="${tags.type}"
                    ${tags.className ? `className="${tags.className}"` : ""}
                    ${tags.value ? `value="${tags.value}"` : ""}
                    ${tags?.name ? `name="${tags?.name}"` : ""}
                 />\n\t\t`;
          break;
        }
        default: {
          tag = `\n\t<${tags.tagName}
              ${tags.className ? `className="${tags.className}"` : ""}
              type="${tags.type}"
              onChange={handleChange}
              ${tags.id ? `value={state.${tags.id}}` : ""}
              ${tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""}
              ${tags?.name ? `name="${tags?.name}"` : ""}
              ${tags?.min ? `min="${tags?.min}"` : ""}
              ${tags?.max ? `max="${tags?.max}"` : ""}
           />`;
          break;
        }
      }
      return tag;
    }

    case "div": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "textarea": {
      tag = `<${tags.tagName}
        ${tags.className ? `className="${tags.className}"` : ""}
        onChange={handleChange}
        ${
          tags.text
            ? `value={state.${tags.text}}`
            : `value={state.${tags.value}}`
        }
        ${tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""}
        ${tags?.cols ? `cols={${tags?.cols}}` : ""}
        ${tags?.rows ? `rows={${tags?.rows}}` : ""}
      />\n\t\t`;
      break;
    }

    case "button": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      } ${tags?.type ? `type=${tags?.type}` : ""}>${tags.text}
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "fieldset": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>
            ${
              tags.child
                ? tags.child?.map((formChild) => {
                    return getTags(formChild, radiokeys, checkBox);
                  })
                : ""
            }
            </${tags?.tagName}>\n\t`;
      break;
    }

    case "legend": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>${tags.text}
            ${
              tags.child
                ? tags.child?.map((formChild) => {
                    return getTags(formChild, radiokeys, checkBox);
                  })
                : ""
            }
            </${tags?.tagName}>\n\t`;
      break;
    }

    case "label": {
      tag = `\n\t<${tags.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      } ${tags.for && `for="${tags.for}"`}>${tags.text}
             ${
               tags.child
                 ? tags.child?.map((formChild) => {
                     return getTags(formChild, radiokeys, checkBox);
                   })
                 : ""
             }</${tags.tagName}>`;
      break;
    }

    case "br": {
      tag = `<${tags.tagName}/>`;
      break;
    }

    case "i": {
      tag = `<${tags.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }/>`;
      break;
    }

    case "table": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "tbody": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>${tags.text ? tags.text : ""}
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "tr": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "th": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>${tags.text ? tags.text : ""}
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "td": {
      tag = `<${tags?.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>${tags.text ? tags.text : ""}
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "h1": {
      tag = `<${tags.tagName}>${tags.text}
          ${
            tags?.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
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
                  return getTags(formChild, radiokeys, checkBox);
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
                  return getTags(formChild, radiokeys, checkBox);
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
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
        </${tags.tagName}>\n\t`;
      break;
    }

    case "span": {
      tag = `<${tags.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      }>${tags.text}
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }</${tags.tagName}>\n\t`;
      break;
    }

    case "p": {
      tag = `<${tags.tagName}>${tags.text ? tags.text : ""}
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
        </${tags.tagName}>\n\t`;
      break;
    }

    case "form": {
      tag = `<${tags?.tagName} onSubmit={handleSubmit}>
          ${
            tags.child
              ? tags.child?.map((formChild) => {
                  return getTags(formChild, radiokeys, checkBox);
                })
              : ""
          }
          ${getCheckboxtag(checkBox)}
          ${radioreturntag(radiokeys)}
          </${tags?.tagName}>\n\t`;
      break;
    }

    case "select": {
      tag = `<${tags?.tagName} 
            type="${tags.type}"
            value={state.value}
            ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
            ${tags?.name ? `name="${tags?.name}"` : ""}
            ${tags.className ? `className="${tags.className}"` : ""}
          >
          ${
            tags.child.length > 10
              ? `{state.option${tags?.id}.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}`
              : `{option${tags?.id}.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}`
          }
          </${tags?.tagName}>\n\t`;
      break;
    }

    default:
  }

  return tag.replaceAll(",", "").replace(/^\s*\n/gm, "");
}

//returns radio component
export function radioreturntag(radiokeys) {
  const radio = radiokeys?.map((key) => {
    return `\n\n\t{${key}radio?.map((radioTags)=>(
        <div>
        <input 
        type="radio"
        name={radioTags?.name}
        value={radioTags?.value}
        id={radioTags?.id}
        onChange={handleChange}
        />
        <label>{radioTags.value}</label>
        </div>
      ))}`;
  });
  return radio;
}

//returns checkbox component
export function getCheckboxtag(checkBox) {
  const check = !isEmpty(checkBox)
    ? `\n\n\t{checkBox?.map((cbTag)=>(
    <div>
    <input 
        type="checkbox"
        name={cbTag?.name}
        value={cbTag?.value}
        id={cbTag?.id}
        onChange={handleToggle}
        checked={checked[cbTag?.name]}
        />
        <label>{cbTag.name}</label>
        </div>
        ))}`
    : "";
  return check;
}
