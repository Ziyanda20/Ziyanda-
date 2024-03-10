import { getElementById } from "./dom"

export const showError = (id: string, err: string) => {
  const parent = getElementById(`${id}-error`);

  if (!parent) return;

  parent.innerHTML = `<b>Oops.</b> ${err}`
  
  parent.classList.remove('hide')
}

export const hideError = (parent: string) => {
  getElementById(`${parent}-error`)?.classList.add('hide')
}