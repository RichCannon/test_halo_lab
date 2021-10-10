import { FC } from "react"
import ReactDOM from "react-dom"

import styles from './Modal.module.scss'



type ModalP = {
   isVisible: boolean
   onDissmissClick: () => void
}

const Modal: FC<ModalP> = ({ isVisible, onDissmissClick, children }) => {


   if (!isVisible) return null

   return (
      ReactDOM.createPortal(
         <div onClick={onDissmissClick} className={styles.container}>
            {children}
         </div>,
         document.getElementById('portal')!)
   )
}

export default Modal