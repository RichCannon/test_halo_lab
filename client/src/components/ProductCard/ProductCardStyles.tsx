import styled from "styled-components";


export const ProductCardContainer = styled.div`
   display: flex;
   background-color:${({ theme }) => theme.colors.white};
   border-radius: 24px;
   flex-direction: column;
   padding: 2em;
   flex: none;
   width: calc(100vw/4);
   margin: 1.5em;

   @media ${({ theme }) => theme.breakpoints.lg} {
      width: calc(100vw/3);
   }

   @media ${({ theme }) => theme.breakpoints.md} {
      width: calc(100vw/2);
   }

   
   @media ${({ theme }) => theme.breakpoints.sm} {
      width: calc(100vw / 1.2);
   }

`

export const CategoryStyle = styled.div`
   opacity: 0.5;
   font-size: 16px;
`

export const NameStyle = styled.div`
   font-size: 40px;
   margin-top: .3em;
`

export const CurrencyStyle = styled.div`
   font-size: 30px;
   margin-top: .2em;
   margin-right: .2em;
`

export const PriceValueStyle = styled.div`
   font-size: 60px;
   text-align: start;
   line-height: 1em;
`



export const ProductContentStyle = styled.div`
   display:flex;
   justify-content: space-between;
   align-items: center;
   margin: 2em 0 0 0;
   flex-wrap: wrap
`

export const CurrentPriceWrapper = styled.div`
   display:flex
`