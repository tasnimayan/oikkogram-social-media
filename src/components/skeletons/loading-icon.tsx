"use client";

export default function LoadingIcon() {
  return (
    <div className="flex items-center justify-center min-h-[300px] h-full bg-white p-8 rounded-lg">
      <div className="relative w-28 h-28">
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Outer loading circle */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" className="outer-loading-circle" />

          {/* Inner circle - outline only */}
          <circle cx="100" cy="100" r="70" fill="none" stroke="#0d9488" strokeWidth="4" className="inner-circle" />

          {/* Letter G in the center */}
          <text x="100" y="115" fontSize="60" fontWeight="bold" fill="#0d9488" textAnchor="middle" fontFamily="Arial, sans-serif">
            OG
          </text>

          {/* Orbiting dots container */}
          <g className="dots-orbit">
            {/* Three equally distanced dots that orbit around the inner circle */}
            <circle cx="100" cy="30" r="8" fill="#0d9488" className="orbit-dot" />
            <circle cx="156.6" cy="135" r="8" fill="#0d9488" className="orbit-dot" />
            <circle cx="43.4" cy="135" r="8" fill="#0d9488" className="orbit-dot" />
          </g>
        </svg>
      </div>
    </div>
  );
}
