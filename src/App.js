import React from 'react';
import './style.css';

import { useSpring, animated } from 'react-spring';

const AnimatedComponent = () => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return <animated.div style={props}>I will fade in</animated.div>;
};

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
