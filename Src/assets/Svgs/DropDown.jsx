import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DropDown = (props) => (
  <Svg
    width={11}
    height={7}
    viewBox="0 0 11 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.38403 1.5L5.42603 4.91702L9.17603 1.5"
      stroke="#8E8E93"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default DropDown;
