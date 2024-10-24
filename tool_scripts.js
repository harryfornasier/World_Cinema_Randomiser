export function movieParameters(genre, dateStart, dateEnd, language, page, sort) {
  this.genre = genre;
  this.dateStart = dateStart;
  this.dateEnd = dateEnd;
  this.language = language;
  this.page = page;
  this.sort = sort;
}

export function createElement(element, className, innerText, value) {
  const createdElement = document.createElement(element);

  if (className) {
    createdElement.classList.add(className);
  }

  if (innerText) {
    createdElement.innerHTML = innerText;
  }

  if (value) {
    createdElement.value = value;
  }

  return createdElement;
}

export function loopSelectionElements(elementList, name) {
  const selectElement = createElement(
    "select",
    `submit__${name}`,
    "Please choose an option"
  );
  for (let i = 0; i < elementList.length; i++) {
    const optionName = elementList[i].name;
    const option = createElement("option", "input__option", optionName, optionName);
    selectElement.appendChild(option);
  }
  return selectElement;
}
