import * as React from "react";
import { SVGProps } from "react";

const SvgArrowup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.162.538c-.641-.72-1.685-.715-2.321 0L.353 6.698C-.287 7.416-.033 8 .923 8h12.155c.956 0 1.207-.589.57-1.303L8.163.537Z"
      fill="#ADB5BD"
    />
  </svg>
);

export default SvgArrowup;
