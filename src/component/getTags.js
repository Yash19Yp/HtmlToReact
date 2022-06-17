export default function getTags(tags) {
  let tag = "";
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
      break;
      // return options;
      // ${(options = getOption(tags))}
    }

    default:
  }

  return tag.replaceAll(",", "").replace(/^\s*\n/gm, "");
}
