import { ButtonHTMLAttributes, FC } from 'react'

import { ButtonStyle, ButtonStyleT, ButtonTextStyleT } from './MyButtonStyles'

// Для более гибкой настройки стилей, прокидываются пропсы для настройки стилей кнопки и текста внутри неё
type MyButtonP = {
   buttonStyle?: ButtonStyleT
   buttonTextStyle?: ButtonTextStyleT
   text?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const MyButton: FC<MyButtonP> = ({ text = ``, buttonStyle = {}, buttonTextStyle = {}, ...buttonProps }) => {

   return (
      <ButtonStyle {...buttonStyle} {...buttonTextStyle} disabledStyle={buttonProps.disabled} {...buttonProps} >
         <div>{text}</div>
      </ButtonStyle>
   )
}

export default MyButton