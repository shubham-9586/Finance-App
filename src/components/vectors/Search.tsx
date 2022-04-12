import * as React from "react";
import { SVGProps } from "react";

const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.674 18.939a1.2 1.2 0 0 1 0 1.644 1.077 1.077 0 0 1-1.57 0l-3.764-3.938a8.604 8.604 0 0 1-5.451 1.953C3.98 18.598 0 14.435 0 9.3 0 4.163 3.98 0 8.889 0c4.91 0 8.89 4.163 8.89 9.3A9.534 9.534 0 0 1 15.91 15l3.763 3.938ZM8.89 16.273c3.682 0 6.667-3.122 6.667-6.974 0-3.852-2.985-6.974-6.667-6.974S2.222 5.447 2.222 9.299c0 3.852 2.985 6.974 6.667 6.974Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgSearch;
