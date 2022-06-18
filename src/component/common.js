export function pruneEmpty(arr) {
  arr = arr?.filter(function (n) {
    return n !== undefined && n !== null && n !== false && n !== 0 && n !== "";
  });
  return arr;
}

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
