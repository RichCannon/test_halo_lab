import styled from "styled-components";

export const FieldContainer = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
`

export const InputContainer = styled.div<{ touched: boolean, error: string }>`
   display: flex;
   align-items: center;
   border: 1px solid;
   border-color: ${({ theme, touched, error }) => touched ? (error ? theme.colors.error : theme.colors.ok) : ' rgba(0, 0, 0, 0.1)'};
   border-radius: 1em;
   width: 100%;
   overflow: hidden;
`

export const InputStyle = styled.input`
   display: flex;
   flex: 3;
   padding: 1em;
   border: 0px;
   font-size: 16px;
   width: 0;
`

export const CrossContainer = styled.div`
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;
   div {
      width: 1.4em;
      height: 1.4em;
      background-color: ${({ theme }) => theme.colors.error};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
   }
`

export const ErrorTextStyle = styled.div`
   color: ${({ theme }) => theme.colors.error};
   font-size: 12px;
   line-height: 1.1em;
   height: 1.1em;
   margin-top: 2px;
`


