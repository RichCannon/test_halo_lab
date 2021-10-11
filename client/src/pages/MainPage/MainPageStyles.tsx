import styled from "styled-components";


export const MainPageContainer = styled.div`
   display:flex;
   flex-direction: column;
   min-height: 100vh;
   background-color: ${({ theme }) => theme.colors.primary};
   align-items: center;
   justify-content: center
`
export const ProductsWrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-content: center;

`

export const CheapestButtonStyle = styled.div`
   display:flex;
   width: fit-content;
   height: 20vh;
   justify-content: center;
   align-items: center;
   flex-direction: column
`