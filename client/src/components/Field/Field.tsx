import { FC, useContext } from "react";
import { FormContext, HandleChangeT, HandleClickT } from "../Form/Form";


type ChildrenArgs = {
   input: {
      name: string
      value: string
      onChange: HandleChangeT,
      onClick: HandleClickT
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
   const { handleChange, inputs, meta, handleClick } = useContext(FormContext);

   const error = meta[name] ? meta[name].error : ``;
   const touched = meta[name] ? meta[name].touched : false
   const value = inputs[name] || ``;
   // console.log(`error`,error)
   //console.log(`touched`,touched)

   return children({ input: { name, value, onChange: handleChange, onClick: handleClick }, meta: { error, touched }, });
};

export { Field }