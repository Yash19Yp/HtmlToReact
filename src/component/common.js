//removes empty or false value from array
export function pruneEmpty(arr) {
  arr = arr?.filter(function (n) {
    return n !== undefined && n !== null && n !== false && n !== 0 && n !== "";
  });
  return arr;
}

//checks empty value
export const isEmpty = (input, options) => {
  options = { isEmpty: [], isNotEmpty: [], ...options };

  if (options.isEmpty?.includes?.(input)) return true;
  if (options.isNotEmpty?.includes?.(input)) return false;
  if ([undefined, null].includes(input)) return true;

  if (input?.constructor?.name === "Array") return !input.length;
  if (input?.constructor?.name === "Number") return Number.isNaN(input);
  if (input?.constructor?.name === "Object") return !Object.keys(input).length;
  if (input?.constructor?.name === "String") return !input.trim().length;

  return false;
};

//for inline css
export function getStyle(tags) {
  let style = "";
  Object.entries(tags?.style).map((key) => {
    style +=
      !isEmpty(key[1]) && isNaN(parseInt(key[0]))
        ? `${[key[0]]}: "${key[1]}",`
        : "";
  });
  return style ? `style={{${style.slice(0, -1)}}}` : "";
}
