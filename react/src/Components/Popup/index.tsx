import "./index.css"

export const Popup = (props: any) => {
  setTimeout(() => props.clearPopup(), 3000)

  return (
    <div className="popup">
      <p><i className="fa-regular fa-circle-check margin--right-2"></i>{props.children}</p>
    </div>
  )
}