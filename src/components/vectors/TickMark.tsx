import * as React from "react";
import { SVGProps } from "react";

const SvgTickMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={9.987} cy={10} rx={9.987} ry={10} fill="#CCF148" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m15.907 7.146-6.478 6.5a.562.562 0 0 1-.808 0l-2.668-2.704a.586.586 0 0 1 0-.813.562.562 0 0 1 .808 0l2.27 2.298 6.08-6.093a.562.562 0 0 1 .809 0 .575.575 0 0 1-.013.812Z"
      fill="#343A40"
    />
  </svg>
);

export default SvgTickMark;
