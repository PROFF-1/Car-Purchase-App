import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Close = (props) => (
  <Svg
    width={16}
    height={15}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.95499 1L14.955 14"
      stroke="#8E8E93"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M14.955 1L1.95499 14"
      stroke="#8E8E93"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default Close;
