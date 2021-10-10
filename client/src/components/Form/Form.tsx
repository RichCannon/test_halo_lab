import { createContext, FC, PropsWithChildren, useState } from "react";

import { Field } from "../Field/Field";


type ExpObj<E = any> = { [key: string]: E }

type HandleSubmitWithValuesT<T = object> = (values: T) => void

type HandleSubmitT = (e: React.FormEvent<HTMLFormElement>) => void


type FormP<InitValue extends object> = {
   render: (args: { handleSubmit: HandleSubmitT }) => JSX.Element
   onSubmit: HandleSubmitWithValuesT<InitValue>
   validate: (values: InitValue) => ExpObj
   initialValues: InitValue
}


type MetaObjT = {
   error: string
   touched: boolean
}

const noop = () => { }

const context = {
   meta: {},
   handleChange: noop,
   handleClick: noop,
   inputs: {}
}

export type HandleChangeT = (event: React.ChangeEvent<HTMLInputElement>) => void
export type HandleClickT = (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) => void

type ContextT = {
   meta: ExpObj<MetaObjT>,
   handleChange: HandleChangeT
   handleClick: HandleClickT
   inputs: ExpObj
}

export const FormContext = createContext<ContextT>(context);

// const App = () => {
//    console.log("App started");

//    const onSubmit = (values) => {
//       //console.log(values);
//    };

//    return (
//       <Form
//          onSubmit={onSubmit}
//          validate={(value) => {
//             const errors: any = {};
//             console.log(`value.name`, value.name)
//             if (value.name && value.name.length > 5) {
//                errors.name = `PIDORAS`;
//             }

//             else if (!value.name) {
//                errors.name = `PUSTO`
//             }
//             if (value.email && value.email.length > 5) {
//                errors.email = `PIDORAS_EMAIL`;
//             }
//             return errors;
//          }}
//          render={({ handleSubmit }) => (
//             <form onSubmitCapture={handleSubmit}>
//                <Field name={`name`}>
//                   {({ error, ...inputD }) => (
//                      <>
//                         <input {...inputD} />
//                         <div>{error}</div>
//                      </>
//                   )}
//                </Field>
//                <Field name={`email`}>
//                   {({ error, ...inputD }) => (
//                      <>
//                         <input {...inputD} />
//                         <div>{error}</div>
//                      </>
//                   )}
//                </Field>
//                <button type={`submit`}>{`PRESS`}</button>
//             </form>
//          )}
//       />
//    );
// };



function Form<T extends object>({ render, validate, onSubmit, initialValues }: PropsWithChildren<FormP<T>>): JSX.Element {
   const [meta, setMeta] = useState<ExpObj<MetaObjT>>({});

   const [inputs, setInputs] = useState(initialValues);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(inputs);
   };

   const handleChange: HandleChangeT = (event) => {
      const name = event.currentTarget.name
      const value = event.currentTarget.value

      setMeta((meta) => {
         const newMeta = { ...meta };
         newMeta[name] = { ...newMeta[name], error: validate({ [name]: value } as T)[name] };
         return newMeta;
      });
      setInputs((values) => ({ ...values, [name]: value }));
   };

   const handleClick: HandleClickT = (event) => {
      const name = event.currentTarget.name;
      const value = event.currentTarget.value
      
      setMeta((meta) => {
         const newMeta = { ...meta };
         newMeta[name] = { ...newMeta[name], touched: true, error: validate({ [name]: value } as T)[name] };
         return newMeta;
      });
   };

   return (
      <FormContext.Provider
         value={{
            meta,
            handleChange,
            handleClick,
            inputs
         }}
      >
         {render({ handleSubmit })}
      </FormContext.Provider>
   );
};



export { Form }
