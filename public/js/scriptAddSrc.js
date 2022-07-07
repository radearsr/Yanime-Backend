const inputTitleElement = document.querySelector("#animeId");
const formEl = document.querySelector("#form-add-src");
const btnSubmit = document.querySelector("button[type='submit']");

const createInputElement = (nameEl, labelText) => {
  const div = document.createElement("div");
  div.classList.add("input-group");
  const label = document.createElement("label");
  label.textContent = labelText;
  label.setAttribute("for", nameEl);
  div.append(label);
  const input = document.createElement("input");
  input.setAttribute("name", nameEl);
  input.setAttribute("id", nameEl);
  div.append(input);
  return div;
};

const createInputHidden = (name, value) => {
  const input = document.createElement("input");
  input.value = value;
  input.type = "hidden";
  input.name =  name;
  return input;
}

const inputEpisode = createInputElement("episode", "Episode");
const inputTotalEps = createInputElement("totalEps", "Total Episode");

inputTitleElement.addEventListener("change", () => {
  const typeVal = inputTitleElement.options[inputTitleElement.selectedIndex].dataset.type;
  let inputMultipleInsert;
  const inputHidden = formEl.querySelector("input[type='hidden']");
  
  if (inputHidden) {
    inputHidden.remove();
  }
  
  if (typeVal === "series") {
    inputMultipleInsert = createInputHidden("multipleInsert", "true");
    formEl.insertBefore(inputTotalEps, btnSubmit);
    inputEpisode.remove();
  } else {
    inputMultipleInsert = createInputHidden("multipleInsert", "false");
    formEl.insertBefore(inputEpisode, btnSubmit);
    inputTotalEps.remove();
  }

  formEl.appendChild(inputMultipleInsert);
});