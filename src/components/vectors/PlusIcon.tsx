import * as React from "react";
import { SVGProps } from "react";

const SvgPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="19" cy="19" r="19" fill="#E5E5E5" />
    <line x1="11" y1="19" x2="27" y2="19" stroke="#343A40" strokeWidth="2" />
    <line x1="19" y1="11" x2="19" y2="27" stroke="#343A40" strokeWidth="2" />
  </svg>
);

export default SvgPlusIcon;
