import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function MyCarsSvg({ size = 24, color = 'currentColor', ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Path d="M17 20a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12Z" />
      <Path d="M18 6h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <Path d="M10 2v4" />
      <Path d="M7 16H4" />
    </Svg>
  );
}

export default MyCarsSvg; 