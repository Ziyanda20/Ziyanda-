import { getElementById } from "./dom";

export const addInputFile = (id: string, name: string) => {
  return addInputFiles([[id, name]])
}

export const addInputFiles = (ids: Array<Array<string>>) => {
  const data = new FormData();

  ids.forEach(([id, name]) => {
    const model = getElementById(id) as HTMLInputElement;
    const file = model?.files ? model?.files[0] : '';

    data.append(name, file);
  });

  return data;
}