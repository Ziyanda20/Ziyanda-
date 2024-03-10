import { getElementById, getElementsByClass } from "./dom";

export const showDropdownMenu = () => {
  getElementById("dropdownmenu")?.classList.remove("hide");

  const div = document.createElement("div");
  div.className = "overlay";

  getElementsByClass("container__header")[0].appendChild(div);

  div.addEventListener("click", () => {
    hideDropdownMenu();

    div.remove();
  });
};

export const hideDropdownMenu = () => {
  getElementById("dropdownmenu")?.classList.add("hide");
};
