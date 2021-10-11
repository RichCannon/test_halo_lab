import { FC } from "react"
import ReactDOM from "react-dom"

import { ModalContainer } from "./ModalStyles"



type ModalP = {
   isVisible: boolean
   onDissmissClick: () => void
}

const Modal: FC<ModalP> = ({ isVisible, onDissmissClick, children }) => {

   // onDissmissClick обрабатывает нажатие мимо контента модалки

   // Если модалка скрыта, то мы её не рендерим
   if (!isVisible) return null

   // Основа для создания модальных окон
   // Используем createPortal для рендера модалки отдельно от основного DOM-дерева
   // Для этого был создан отдельно div с id="portal" на уровне с root div
   return (
      ReactDOM.createPortal(
         <ModalContainer onClick={onDissmissClick}>
            {children}
         </ModalContainer>,
         document.getElementById('portal')!)
   )
}

export default Modal