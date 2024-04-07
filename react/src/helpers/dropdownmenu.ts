import { getElementById, get1ByClass } from "./dom";

export const showDropdownMenu = () => {
  getElementById("dropdownmenu")?.classList.remove("hide");

  const div = document.createElement("div");
  div.className = "overlay";

  get1ByClass("container__header")?.appendChild(div);

  div.addEventListener("click", () => {
    hideDropdownMenu();

    div.remove();
  });
};

export const hideDropdownMenu = () => {
  getElementById("dropdownmenu")?.classList.add("hide");
};
