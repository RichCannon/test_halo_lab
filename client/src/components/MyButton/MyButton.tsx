import { ButtonHTMLAttributes, FC } from 'react'
import styles from './MyButton.module.scss'

type MyButtonP = {
   onClick?: () => void
   text?: string
   buttonClassname?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const MyButton: FC<MyButtonP> = ({ onClick, text = ``, buttonClassname = `` }) => {
   return (
      <button onClick={onClick} className={`${styles.container} ${buttonClassname}`}>
         <div className={styles.text}>{text}</div>
      </button>
   )
}

export default MyButton