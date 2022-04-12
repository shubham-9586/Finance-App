import * as React from "react";
import { SVGProps } from "react";

const SvgMaster = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 22 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M15 0a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" fill="#FF9800" />
    <path d="M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Z" fill="#D50000" />
    <path
      d="M8 7a6.988 6.988 0 0 0 3 5.74A6.988 6.988 0 0 0 14 7a6.988 6.988 0 0 0-3-5.74A6.988 6.988 0 0 0 8 7Z"
      fill="#FF3D00"
    />
  </svg>
);

export default SvgMaster;
