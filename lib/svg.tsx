import React from 'react'

export const GOGOLamp: React.FC = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="lampGlow"
          cx="50%"
          cy="50%"
          r="70%"
          fx="50%"
          fy="50%"
        >
          <stop
            offset="0%"
            style={{ stopColor: 'rgb(255,105,180)', stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: 'rgb(128,0,128)', stopOpacity: 0 }}
          />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="black" />
      <circle cx="100" cy="100" r="70" fill="#600" />
      <circle cx="100" cy="100" r="60" fill="url(#lampGlow)" />
      <ellipse
        cx="80"
        cy="80"
        rx="20"
        ry="15"
        fill="rgba(255,255,255,0.3)"
        transform="rotate(-45 80 80)"
      />
      <text
        x="100"
        y="110"
        fontFamily="Verdana, sans-serif"
        fontSize="40"
        fontWeight="bold"
        textAnchor="middle"
        fill="rgb(255,255,255)"
      >
        GOGO!
      </text>
    </svg>
  )
}
