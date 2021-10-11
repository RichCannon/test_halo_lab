import { createContext, PropsWithChildren, useEffect, useState } from "react";


type HandleSubmitWithValuesT<T = object> = (values: T) => void

type HandleSubmitT = (e: React.FormEvent<HTMLFormElement>) => void


type FormP<InitValue extends object> = {
   render: (args: { handleSubmit: HandleSubmitT, isError: boolean }) => JSX.Element
   onSubmit: HandleSubmitWithValuesT<InitValue>
   validate: (values: InitValue) => Record<string, any>
   initialValues: InitValue
   required: (keyof InitValue)[]
}


type MetaObjT = {
   error: string
   touched: boolean
   required: boolean
}

// Функция-заглушка
const noop = () => { }

const context = {
   meta: {},
   handleChange: noop,
   handleFocus: noop,
   inputs: {}
}

export type HandleChangeT = (event: React.ChangeEvent<HTMLInputElement>) => void
export type HandleFocusT = (event: React.FocusEvent<HTMLInputElement, Element>) => void

type ContextT = {
   meta: Record<string, MetaObjT>,
   handleChange: HandleChangeT
   handleFocus: HandleFocusT
   inputs: Record<string, any>

}

// Создание контекста для того, чтоб потом прокинуть в Field нужные переменные
export const FormContext = createContext<ContextT>(context);

// Основная компонента для обработик формы. Содержит в себе ошибки для валидации, значение инпутов, измененный обработчик сабмита и отправляет 
// нужные данные в дочерние компоненты  Field 
function Form<T extends object>({ render, validate, onSubmit, initialValues, required }: PropsWithChildren<FormP<T>>): JSX.Element {

   useEffect(() => {
      let metaInitObj: Record<string, MetaObjT> = {}

      // Создаём мета объект д
      for (const key in initialValues) {
         metaInitObj[key] = { touched: false, error: ``, required: required.includes(key) }
      }

      setMeta(metaInitObj)
   }, [])


   // Мета данные которые хранят в себе состояние touched и ошибки валидации
   const [meta, setMeta] = useState<Record<string, MetaObjT>>({});

   // Стэйт со всеми значниями инпутов которые находяться в форме 
   const [inputs, setInputs] = useState(initialValues);

   // Обработчик нажатия на кнопку в форме с предотвращением перезагрузки со страницы
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(inputs);
   };


   // Обработка изменения данных в инпуте и помещение их в локальный стэйт
   const handleChange: HandleChangeT = (event) => {
      const name = event.currentTarget.name
      const value = event.currentTarget.value

      // Проверяем выполняет ли условие новое значение инпута и обновляем объект meta с ошибками
      setMeta((meta) => {
         const newMeta = { ...meta };
         newMeta[name] = { ...newMeta[name], error: validate({ [name]: value } as T)[name] };
         return newMeta;
      });
      setInputs((values) => ({ ...values, [name]: value }));
   };


   // Обработчик фокуса на инпут для опредления был ли инпут активирован или нет (touched)
   const handleFocus: HandleFocusT = (event) => {
      const name = event.currentTarget.name;
      const value = event.currentTarget.value

      setMeta((meta) => {
         const newMeta = { ...meta };
         newMeta[name] = { ...newMeta[name], touched: true, error: validate({ [name]: value } as T)[name] };
         return newMeta;
      });
   };


   // Проверка на наличие ошибок в объекте с ошибками. Если они есть, то можно вернуть булевское значение
   // которое можно использовать для отключения кнопки.
   let isError = false
   let isEmptyErrorObj = true
   for (const key in meta) {
      if (isEmptyErrorObj) {
         isEmptyErrorObj = false
      }
      if (meta[key].error || (meta[key].required && !meta[key].touched)) {
         isError = true
      }
   }

   if (isEmptyErrorObj) {
      isError = true
   }


   // С помощью конекста прокидываем нужные данные в компоненту Field
   return (
      <FormContext.Provider
         value={{
            meta,
            handleChange,
            handleFocus,
            inputs
         }}
      >
         {render({ handleSubmit, isError })}
      </FormContext.Provider>
   );
};



export { Form }
