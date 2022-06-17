function modifyNode(node) {
  let defaultValue = {
    tagName: node.localName,
  };
  switch (node.localName) {
    case "form": {
      defaultValue = Object.assign(defaultValue, {
        method: node.method,
        onSubmit: node,
      });
      break;
    }

    case "div": {
      defaultValue = Object.assign(defaultValue, {
        className: node.className,
      });
      break;
    }

    case "label": {
      defaultValue = Object.assign(defaultValue, {
        for: node.htmlFor,
        text: node.innerText,
      });
      break;
    }

    case "span": {
      defaultValue = Object.assign(defaultValue, {
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
        text: node,
      });
      break;
    }

    case "p": {
      defaultValue = Object.assign(defaultValue, {
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
