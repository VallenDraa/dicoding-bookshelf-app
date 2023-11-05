/**
 * @param {string} selector
 */
export const qs = selector => document.querySelector(selector);

/**
 * @param {keyof HTMLElementTagNameMap} tagName
 * @param {HTMLElement} options
 */
export const el = (tagName, options) => {
  const element = document.createElement(tagName);

  if (options) {
    for (const [key, value] of Object.entries(options)) {
      if (key === "children") {
        for (const child of value) {
          element.append(child);
        }
      } else {
        element[key] = value;
      }
    }
  }

  return element;
};
