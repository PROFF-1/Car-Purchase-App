import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DrivingSkillsSvg({ size = 24, color = 'currentColor', ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Path d="M6 16.3V18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.7" />
      <Path d="M18 2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <Path d="M6 2H2v4a2 2 0 0 0 2 2h2" />
      <Path d="M2 16.3V18a2 2 0 0 0 2 2h2" />
      <Path d="M22 16.3V18a2 2 0 0 1-2 2h-2" />
      <Path d="M12 12v-6" />
    </Svg>
  );
}

export default DrivingSkillsSvg; 