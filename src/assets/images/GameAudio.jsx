const GameAudio = ({music, ...props}) => (
  <svg
    fill="currentColor"
    width={100}
    height={100}
    viewBox="0 0 400 400"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    { music 
            ?<><path d="M146.7 26.7h26.7v26.7h-26.7z" />
            <path d="M173.3 0v26.7H200v346.6h-26.7V400h53.4V0H200zM360 26.7v346.6h26.7V26.7zM120 53.3h26.7V80H120zM93.3 80H120v26.7H93.3zm213.4 26.7V320h26.6V80h-26.6zM253.3 160v106.7H280V133.3h-26.7z" />
            <path d="M93.3 240V106.6h-80v186.8h80.1V240zm-26.6-80v106.7H40V133.3h26.7V160z" />
            <path d="M93.3 293.3H120V320H93.3zM120 320h26.7v26.7H120zm26.7 26.7h26.7v26.7h-26.7z" /></>
            
            :<><path d="M146.7 26.7h26.7v26.7h-26.7zM120 53.3h26.7V80H120zM93.3 80H120v26.7H93.3z" />
            <path d="M93.3 240V106.6h-80v186.8h80.1V240zm-26.6-80v106.7H40V133.3h26.7V160zm186.6-26.7H280V160h-26.7zm106.7 0h26.7V160H360zM280 160h26.7v26.7H280zm53.3 0H360v26.7h-26.7z" />
            <path d="M93.3 293.3H120V320H93.3zm213.4-106.6h26.7v26.7h-26.7zM120 320h26.7v26.7H120zm160-106.7h26.7V240H280z" />
            <path d="M333.3 213.3H360V240h-26.7zM146.7 346.7h26.7v26.7h-26.7zM253.3 240H280v26.7h-26.7zm106.7 0h26.7v26.7H360z" />
            <path d="M173.3 0v26.7H200v346.6h-26.7V400h53.4V0H200z" /></>
    }
  </svg>
);
export default GameAudio;
