import {getElementById} from "./dom"

export const openModal = (id: string) => {
  getElementById(`${id}-modal`)?.classList.remove('modal--closed')
}

export const closeModal = (parent: string) => {
  getElementById(`${parent}-modal`)?.classList.add('modal--closed')
}