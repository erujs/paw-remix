import { useState } from "react";

export const Dog = ({ className }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="380 140 580 810"
      className={className}
      fill={isHovered ? 'salmon' : 'white'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <g
        stroke="none"
        transform="translate(0,1080) scale(0.1,-0.1)"
      >
        <path d="M4276 9379c-42 -37 -84 -106 -125 -212 -49 -124 -68 -155 -141 -232 -57 -60 -69 -80 -79 -124 -16 -75 -13 -180 8 -303 19 -107 19 -108 -1 -145 -16 -32 -19 -53 -15 -128 8 -194 113 -362 620 -989 585 -723 809 -1062 982 -1485 134 -328 182 -585 172 -924 -7 -227 -16 -283 -96 -583 -92 -345 -270 -1057 -262 -1048 4 5 41 59 82 119 56 83 112 147 226 261 84 83 153 150 153 150 0 -1 -18 -46 -41 -101 -96 -237 -217 -656 -250 -868 -16 -104 -6 -339 20 -489 28 -160 91 -404 151 -589 54 -167 119 -341 120 -322 1 48 55 296 81 373 37 114 104 259 153 333 48 72 357 437 370 437 13 0 -49 -267 -104 -445 -17 -55 -37 -138 -45 -184 -16 -88 -20 -306 -7 -315 4 -2 16 19 26 47 22 63 90 180 159 273 51 69 216 237 463 474 240 229 485 554 693 918 29 50 54 92 55 92 2 0 -3 -42 -11 -92 -47 -295 -171 -612 -345 -876 -80 -121 -83 -118 77 -55 186 73 400 199 571 336 228 184 546 573 656 803 22 46 42 83 44 81 9 -8 -30 -199 -58 -282 -31 -95 -112 -272 -172 -374 -19 -34 -31 -61 -25 -61 6 0 48 19 92 41 303 153 583 459 776 850 278 562 294 1215 44 1849 -121 306 -388 795 -577 1055 -13 18 -10 26 49 103 116 155 209 358 270 597 40 155 60 288 75 490 38 525 105 780 270 1041 123 193 130 214 72 214 -98 0 -600 -319 -899 -572 -180 -152 -411 -422 -515 -601 l-42 -73 -166 166c-315 316 -613 536 -826 611 -152 53 -362 63 -691 33 -356 -33 -607 -20 -808 43 -228 71 -556 262 -927 540 -191 143 -236 173 -255 173 -7 0 -28 -14 -47 -31z" />
        <path d="M8515 9309c-192 -110 -317 -211 -546 -439 -153 -152 -405 -429 -397 -435 2 -1 59 -49 127 -106 198 -165 292 -241 295 -237 2 1 39 50 82 108 43 58 122 150 175 205l96 100 27 133c38 191 95 358 187 542 43 89 79 165 79 170 0 21 -40 8 -125 -41z" />
      </g>
    </svg>
  );
};

export const Cat = ({ className }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="50 370 500 560"
      className={className}
      fill={isHovered ? 'salmon' : 'white'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <g
        stroke="none"
        transform="translate(0,1080) scale(0.1,-0.1)"
      >
        <path
          d="M2356 6993 c-4 -10 -12 -65 -17 -123 -22 -236 -39 -338 -78 -460 -21 -69 -46 -173 -56 -230 -28 -178 -44 -251 -59 -275 -8 -13 -82 -83 -163 -156 -422 -382 -640 -613 -883 -935 -149 -197 -300 -428 -300 -459 0 -3 27 17 61 45 33 27 62 50 64 50 2 0 -21 -54 -51 -121 -108 -242 -194 -499 -230 -694 -44 -234 -5 -472 122 -743 42 -91 164 -305 170 -299 2 2 21 64 44 137 52 175 52 174 61 116 14 -88 65 -173 158 -266 173 -173 435 -312 836 -443 326 -107 980 -283 1400 -376 170 -38 401 -81 431 -81 8 0 -54 62 -138 137 -84 75 -154 140 -156 143 -1 4 44 12 100 18 236 26 403 34 623 29 237 -5 346 -18 480 -58 129 -38 491 -239 622 -345 23 -19 44 -34 47 -34 19 0 -32 255 -80 399 -65 195 -130 314 -259 471 -135 164 -354 484 -340 498 2 2 63 -30 135 -73 72 -42 133 -75 136 -73 8 8 -35 155 -71 239 -36 85 -71 139 -203 313 -40 52 -91 129 -113 171 l-41 75 87 0 87 0 -23 38 c-13 20 -54 84 -92 142 -80 120 -86 149 -42 205 14 19 61 58 103 87 108 73 176 140 202 199 27 64 45 209 33 280 -8 53 -8 53 33 94 51 52 64 100 64 240 0 82 5 120 21 168 36 106 13 131 -201 222 -239 101 -390 185 -448 247 -12 13 -38 64 -58 113 -72 179 -133 275 -232 366 -108 100 -223 153 -397 185 -128 23 -461 30 -595 13 -58 -7 -134 -14 -170 -14 l-64 0 -23 40 c-12 22 -39 83 -59 135 -42 110 -117 260 -149 299 -12 14 -59 80 -106 146 -46 66 -103 141 -128 168 -46 49 -83 61 -95 30z"
        />
      </g>
    </svg>
  );
};

export const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        background: 'none',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle cx="60" cy="50" r="4" fill="#e15b64">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.67s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.67s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#e15b64">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.33s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.33s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#e15b64">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          ></animate>
        </circle>
      </g>
      <g transform="translate(-15 0)">
        <path
          d="M50 50L20 50A30 30 0 0 0 80 50Z"
          fill="#f8b26a"
          transform="rotate(90 50 50)"
        ></path>
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;-45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
};
