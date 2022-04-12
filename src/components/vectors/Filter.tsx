import * as React from "react";
import { SVGProps } from "react";

const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 13a1 1 0 0 1-.117-1.993L1 11h11a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3H1Zm16-3h-2a1 1 0 0 0-.993.883L14 11v2a1 1 0 0 0 .883.993L15 14h2a1 1 0 0 0 .993-.883L18 13v-2a1 1 0 0 0-.883-.993L17 10ZM5 0a3 3 0 0 1 3 3h11a1 1 0 0 1 .117 1.993L19 5H8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h2Zm0 2H3a1 1 0 0 0-.993.883L2 3v2a1 1 0 0 0 .883.993L3 6h2a1 1 0 0 0 .993-.883L6 5V3a1 1 0 0 0-.883-.993L5 2Z"
      fill="#fff"
    />
  </svg>
);

export default SvgFilter;
