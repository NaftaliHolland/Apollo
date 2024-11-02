const Logo = ({ fillColor }) => {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="30" height="30" viewBox="0 0 500.000000 500.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
    fill={`#${fillColor}`} stroke="none">
    <path d="M827 4984 c-396 -72 -699 -357 -799 -750 l-23 -89 0 -1650 0 -1650 26 -96 c50 -179 135 -325 264 -454 132 -132 271 -213 455 -264 l95 -26 1655 0 1655 0 100 28 c356 98 626 373 717 734 l23 88 0 1650 0 1650 -26 96 c-50 179 -134 323 -264 454 -131 132 -271 213 -455 264 l-95 26 -1625 2 c-1370 1 -1637 -1 -1703 -13z m1793 -576 c48 -15 104 -57 145 -110 25 -31 218 -477 661 -1524 344 -813 637 -1507 650 -1542 38 -100 28 -189 -29 -251 -33 -36 -115 -71 -167 -71 -57 0 -136 36 -175 81 -20 23 -84 165 -195 432 l-165 397 -845 0 -846 0 -164 -395 c-99 -239 -175 -409 -193 -430 -62 -76 -176 -104 -263 -66 -61 28 -92 55 -115 106 -26 55 -24 129 4 201 13 32 304 721 646 1529 370 873 637 1492 658 1523 54 80 128 123 228 135 41 5 122 -2 165 -15z"/>
    <path d="M2164 3042 l-330 -797 333 -3 c183 -1 483 -1 666 0 l333 3 -330 797 c-182 439 -333 798 -336 797 -3 0 -154 -358 -336 -797z"/>
    </g>
    </svg>
  )
}

export default Logo;
