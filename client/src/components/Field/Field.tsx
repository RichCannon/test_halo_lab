import { FC, useContext } from "react";
import { FormContext, HandleChangeT, HandleFocusT } from "../Form/Form";


type ChildrenArgs = {
   input: {
      name: string
      value: string
      onChange: HandleChangeT,
      onFocus: HandleFocusT
   }
   meta: {
      error: string
      touched: boolean
   }
}

type FieldP = {
   children: (args: ChildrenArgs) => JSX.Element
   name: string
}

const Field: FC<FieldP> = ({ children, name }) => {
   // Получаем контекст с нужными нам данными из Form
   const { handleChange, inputs, meta, handleFocus } = useContext(FormContext);

   const error = meta[name] ? meta[name].error : ``;
   const touched = meta[name] ? meta[name].touched : false
   const value = inputs[name] || ``;

   // Вызываем chidlren как функцию так как так проще будет работать с кастомными инпутами
   return children({ input: { name, value, onChange: handleChange, onFocus: handleFocus }, meta: { error, touched }, });
};


export { Field }