import styled from "styled-components";

export const FormStyle = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 1em;
`

export const ModalContentContainer = styled.div`
   border-radius: 24px;
   display: flex;
   flex-direction: column;
   background-color: ${({ theme }) => theme.colors.white};
   min-width: 25vw;

   @media ${({ theme }) => theme.breakpoints.lg} {
      min-width: 40vw;
   }

   @media ${({ theme }) => theme.breakpoints.md} {
      min-width: 60vw;
   }

   
   @media ${({ theme }) => theme.breakpoints.sm} {
      min-width: 90vw;
   }


`

export const CloseWrapper = styled.div`
   width: 2em;
   height: 2em;
   border-radius: 50%;
   background-color: ${({ theme }) => theme.colors.white2};
   align-self: flex-end;
   transform: translate(30%, -30%);
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
`

export const ContentStyle = styled.div`
   margin: 2.5em;
   display: flex;
   flex-direction: column;
`

export const ProductDataWrapper = styled.div`
    display: flex;
   align-items: center;
   flex-direction: column;
 `

export const CategoryStyle = styled.div`
   opacity: 0.5;
   font-size: 16px;
 `

export const NameStyle = styled.div`
   font-size: 40px;
   margin-top: 0.3em;
 `

export const PriceWrapper = styled.div`
   display: flex;
 `

export const CurrencyStyle = styled.div`
   font-size: 30px;
   margin-top: 0.2em;
   margin-right: 0.2em;
 `

export const PriceValueStyle = styled.div`
   font-size: 60px;
   text-align: start;
   line-height: 1em;
 `