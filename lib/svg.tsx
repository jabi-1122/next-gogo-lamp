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

export const GOGOLamp2 = ({ isLit = false }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop
          offset="0%"
          style={{ stopColor: isLit ? '#40a0ff' : '#002080', stopOpacity: 1 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: isLit ? '#0000ff' : '#000040', stopOpacity: 0 }}
        />
      </radialGradient>
      <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
        <feGaussianBlur stdDeviation={isLit ? '8' : '2'} result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="brightGlow" height="300%" width="300%" x="-75%" y="-75%">
        <feGaussianBlur stdDeviation="20" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* 背景の円 */}
    <circle cx="100" cy="100" r="98" fill="#000000" />
    {/* 発光する円 */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="url(#lampGlow)"
      filter="url(#neonGlow)"
    />
    {/* 点灯時の追加の光効果 */}
    {isLit && (
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="rgba(64, 160, 255, 0.3)"
        filter="url(#brightGlow)"
      />
    )}
    {/* GOGO! テキスト */}
    <text
      x="100"
      y="115"
      fontFamily="Arial Black, sans-serif"
      fontSize="48"
      fontWeight="bold"
      textAnchor="middle"
      fill={isLit ? '#ffff00' : '#ff40ff'}
      filter="url(#neonGlow)"
    >
      GOGO!
    </text>
    {/* テキストの縁取り */}
    <text
      x="100"
      y="115"
      fontFamily="Arial Black, sans-serif"
      fontSize="48"
      fontWeight="bold"
      textAnchor="middle"
      fill="none"
      stroke={isLit ? '#ffffff' : '#ff80ff'}
      strokeWidth="3"
      filter="url(#neonGlow)"
    >
      GOGO!
    </text>
  </svg>
)
