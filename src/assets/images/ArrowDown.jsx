const ArrowDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="35px"
    height="17px"
    viewBox="0 0 34 17"
    {...props}
  >
    <defs>
      <filter
        id="alpha"
        filterUnits="objectBoundingBox"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
      >
        <feColorMatrix
          type="matrix"
          in="SourceGraphic"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
      </filter>
      <mask id="mask0">
        <g filter="url(#alpha)">
          <rect
            x={0}
            y={0}
            width={34}
            height={17}
            style={{
              fill: "rgb(0%,0%,0%)",
              fillOpacity: 0.996078,
              stroke: "none",
            }}
          />
        </g>
      </mask>
      <clipPath id="clip1">
        <rect x={0} y={0} width={34} height={17} />
      </clipPath>
      <g id="surface5" clipPath="url(#clip1)">
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: "currentcolor",
            fillOpacity: 1,
          }}
          d="M -0.00390625 -0.00390625 C 11.328125 -0.00390625 22.660156 -0.00390625 33.996094 -0.00390625 C 33.996094 0 33.996094 0.0078125 33.996094 0.015625 C 28.328125 5.675781 22.664062 11.335938 17 16.996094 C 16.996094 16.996094 16.992188 16.996094 16.988281 16.996094 C 11.324219 11.335938 5.660156 5.675781 -0.00390625 0.015625 C -0.00390625 0.0078125 -0.00390625 0 -0.00390625 -0.00390625 Z M -0.00390625 -0.00390625 "
        />
      </g>
    </defs>
    <g id="surface1">
      <use xlinkHref="#surface5" mask="url(#mask0)" />
    </g>
  </svg>
);

export default ArrowDown;