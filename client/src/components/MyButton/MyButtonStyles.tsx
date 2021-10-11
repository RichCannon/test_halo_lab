import styled from "styled-components";

export type ButtonTextStyleT = {
   fontSize?: string
   fontWeight?: `bold` | `bolder` | `lighter` | `normal` | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

export type ButtonStyleT = {
   padding?: string
   disabledStyle?: boolean
   margin?: string
}

export const ButtonStyle = styled.button<ButtonTextStyleT & ButtonStyleT>`
   background-color: ${({ theme, disabledStyle }) => disabledStyle ? `#d3d3d3` : theme.colors.white};
   border-radius: 16px;
   border: 1px solid rgba(0, 0, 0, 0.1);
   display: flex;
   justify-content: center;
   align-items: center;
   padding: ${({ padding }) => padding || `1em`};
   margin: ${({ margin }) => margin || `0px`};
   align-self: stretch;

   
   &:hover {
      background-color: ${({ theme, disabledStyle }) => disabledStyle ? `#d3d3d3` : theme.colors.ok2};
      border: 1px solid ${({ theme, disabledStyle }) => disabledStyle ? `rgba(0, 0, 0, 0.1)` : theme.colors.ok2};
  
      div {
   color: ${({ theme }) => theme.colors.white};
}
   }

   div {
   color:${({ theme, disabledStyle }) => disabledStyle ? theme.colors.white : theme.colors.ok2};
   cursor: default ;
   font-weight: ${({ fontWeight }) => fontWeight || 500};
   font-size: ${({ fontSize }) => fontSize || `14px`}
}
`