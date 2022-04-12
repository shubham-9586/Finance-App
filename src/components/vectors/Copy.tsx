import * as React from "react";
import { SVGProps } from "react";

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.23 2.154H3.77a1.616 1.616 0 0 0-1.616 1.615v8.616A1.616 1.616 0 0 0 3.769 14h6.462a1.616 1.616 0 0 0 1.615-1.615V3.769a1.616 1.616 0 0 0-1.615-1.615Zm.54 10.23a.538.538 0 0 1-.54.539H3.77a.538.538 0 0 1-.54-.538V3.769a.539.539 0 0 1 .54-.538h6.46a.539.539 0 0 1 .54.538v8.616Z"
      fill="currentColor"
    />
    <path
      d="M1.077 1.615a.539.539 0 0 1 .538-.538H7A.538.538 0 1 0 7 0H1.615A1.616 1.616 0 0 0 0 1.615v6.462a.538.538 0 1 0 1.077 0V1.615Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgCopy;
