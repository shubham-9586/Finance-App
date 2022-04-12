import * as React from "react";
import { SVGProps } from "react";

const SvgArrowdown = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.838 7.462c.641.72 1.685.715 2.321 0l5.488-6.16c.64-.719.386-1.302-.57-1.302H.921C-.034 0-.285.589.352 1.303l5.486 6.16Z"
      fill="#ADB5BD"
    />
  </svg>
);

export default SvgArrowdown;
