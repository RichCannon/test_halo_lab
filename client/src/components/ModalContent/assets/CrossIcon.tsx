

const CrossIcon = (props: React.SVGProps<SVGSVGElement> & { stroke?: string }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={20}
         height={20}
         fill="none"
         {...props}
      >
         <path
            d="M15 5L5 15M5 5l10 10"
            stroke={props.stroke || `#000`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   )
}

export default CrossIcon
