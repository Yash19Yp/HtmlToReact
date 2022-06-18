export default function getTags(tags, radiokeys, groupedRadiotag) {
  let tag = "";
  // console.log("demo", tags, radiokeys, groupedRadiotag);

  switch (tags.tagName) {
    // case "input": {
    //   tag = `<${tags.tagName}
    //              type="${tags.type}"
    //              ${tags.type !== "submit" ? `onChange={handleChange}` : ""}
    //              ${tags.id ? `value={state.${tags.id}}` : ""}
    //              ${
    //                tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""
    //              }
    //              ${tags?.name ? `name="${tags?.name}"` : ""}
    //          />\n\t`;
    //   break;
    // }

    case "input": {
      switch (tags.type) {
        case "text": {
          tag = `<${tags.tagName}
            ${tags.className ? `className="${tags.className}"` : ""}
            type="${tags.type}"
            onChange={handleChange}
            ${tags.id ? `value={state.${tags.id}}` : ""}
            ${tags?.placeholder ? `placeholder="${tags?.placeholder}"` : ""}
            ${tags?.name ? `name="${tags?.name}"` : ""}
         />\n\t`;
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
          // tag = radioreturntag(tags, radiokeys, groupedRadiotag).join("\n\n\t");
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
          //   onChange={handleChange}
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
        default:
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(
                    getTags(formChild, radiokeys, groupedRadiotag)
                  );
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
                    return getTags(formChild, radiokeys, groupedRadiotag);
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
                    return getTags(formChild, radiokeys, groupedRadiotag);
                  })
                : ""
            }
            </${tags?.tagName}>\n\t`;
      break;
    }

    case "label": {
      tag = `<${tags.tagName} ${
        tags.className ? `className="${tags.className}"` : ""
      } ${tags.for && `for="${tags.for}"`}>${tags.text}
             ${
               tags.child
                 ? tags.child?.map((formChild) => {
                     return getTags(formChild, radiokeys, groupedRadiotag);
                   })
                 : ""
             }</${tags.tagName}>\n\t\t`;
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
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
                  return getTags(formChild, radiokeys, groupedRadiotag);
                })
              : ""
          }
          ${getCheckboxtag()}
          ${radioreturntag(radiokeys, groupedRadiotag)}
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
      break;
      // return options;
      // ${(options = getOption(tags))}
    }

    default:
  }

  return tag.replaceAll(",", "").replace(/^\s*\n/gm, "");
}

export function radioreturntag(radiokeys, groupedRadiotag) {
  const demo = radiokeys?.map((key) => {
    return `\n\n\t{${key}radio?.map((radioTags)=>(
        <div>
          <label>{radioTags.name}</label>
          <input 
            type="radio",
            name={radioTags?.name},
            value={radioTags?.value},
            id={radioTags?.id}
            onChange={handleChange}
          />
        </div>
      ))}`;
  });
  return demo;
}

export function getCheckboxtag() {
  return `\n\n\t{checkBox?.map((cbTag)=>(
        <div>
          <label>{cbTag.name}</label>
          <input 
            type="checkbox",
            name={cbTag?.name},
            value={cbTag?.value},
            id={cbTag?.id}
            onChange={handleCheck}
          />
        </div>
        ))}`;
}
