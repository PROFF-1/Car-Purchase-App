import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function MaintainSvg({ size = 24, color = 'currentColor', ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-2.11 2.11a4 4 0 0 1-5.66 0l-2.83-2.83a4 4 0 0 1 0-5.66l2.11-2.11a6 6 0 0 1 7.94-7.94l3.77 3.77Z" />
      <Path d="m18 10-1.5-1.5" />
      <Path d="m15 7-1.5-1.5" />
      <Path d="m13 5-1.5-1.5" />
      <Path d="m11 3-1.5-1.5" />
    </Svg>
  );
}

export default MaintainSvg; 