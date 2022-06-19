function modifyNode(node) {
  let defaultValue = {
    tagName: node.localName,
  };
  switch (node.localName) {
    case "i": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
      });
      break;
    }

    case "textarea": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.innerText,
        rows: node.rows,
        cols: node.cols,
        value: node,
      });
      break;
    }

    case "button": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        type: node.type,
        text: node.innerText,
      });
      break;
    }

    case "table": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
      });
      break;
    }

    case "tr": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.textContent,
      });
      break;
    }

    case "ul": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        style: node.style,
        text: node,
      });
      break;
    }

    case "li": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.innerText,
      });
      break;
    }

    case "th": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.textContent,
      });
      break;
    }

    case "td": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.textContent,
      });
      break;
    }

    case "form": {
      defaultValue = Object.assign(defaultValue, {
        method: node.method,
        onSubmit: node,
        className: node.className,
      });
      break;
    }

    case "div": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
      });
      break;
    }

    case "fieldset": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
      });
      break;
    }

    case "legend": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.innerText,
      });
      break;
    }

    case "label": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        for: node.htmlFor,
        text: node.innerText,
      });
      break;
    }

    case "span": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.textContent,
      });
      break;
    }

    case "input": {
      defaultValue = Object.assign(defaultValue, {
        id: node.id,
        type: node.type,
        name: node.name,
        placeholder: node.placeholder,
        value: node.value,
        className: node.className,
        accept: node.accept,
        multiple: node.multiple,
        min: node.min,
        max: node.min,
        checked: node.checked,
        required: node.required,
      });
      break;
    }

    case "h1": {
      defaultValue = Object.assign(defaultValue, {
        text: node.innerText,
      });
      break;
    }

    case "h2": {
      defaultValue = Object.assign(defaultValue, {
        text: node.innerText,
      });
      break;
    }

    case "h3": {
      defaultValue = Object.assign(defaultValue, {
        text: node.innerText,
      });
      break;
    }

    case "h4": {
      defaultValue = Object.assign(defaultValue, {
        text: node.innerText,
      });
      break;
    }

    case "p": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
        text: node.innerText,
      });
      break;
    }

    case "select": {
      defaultValue = Object.assign(defaultValue, {
        id: node.id,
        type: node.type,
        name: node.name,
        className: node.className,
      });
      break;
    }

    case "option": {
      defaultValue = Object.assign(defaultValue, {
        value: node.value,
        text: node.text,
      });
      break;
    }

    default:
  }
  return defaultValue;
}

export default function alog(root, build = {}) {
  return root.map((child) => {
    const node = modifyNode(child) ?? {};

    if (child.children.length > 0) {
      node.child = alog([...child.children]);
    }
    return node;
  });
}
