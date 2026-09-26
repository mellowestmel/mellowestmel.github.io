function createElement(tagName, properties = {}, children = []) {
    const element = document.createElement(tagName);

    for (const [propertyName, propertyValue] of Object.entries(properties)) {
        if (propertyName === "class") {
            element.className = propertyValue;
        } else if (propertyName === "text") {
            element.textContent = propertyValue;
        } else if (propertyName === "html") {
            element.innerHTML = propertyValue;
        } else {
            element.setAttribute(propertyName, propertyValue);
        }
    }

    for (const child of children) {
        element.appendChild(child);
    }

    return element;
}

export {
    createElement
};