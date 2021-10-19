import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledInput = styled(animated.input)`
  padding: 10px 15px;
  font-size: 20px;
`;

const StyledParagraph = styled(animated.p)`
  font-size: 45px
`;

const Input = ({ handleChangeText }) => {
  const [text, setText] = useState('');

  const onChangeValue = (input) => {
    const { value } = input.target;
    setText(value);
    handleChangeText(value);
  };

  return <StyledInput value={text} onChange={onChangeValue} />;
};

const ParagraphAnimated = ({ children }) => {
  const [styles, animate] = useSpring(() => ({
    from: { opacity: 0, y: -5 },
    to: { opacity: 1, y: 0 },
  }));

  useEffect(() => {
    animate({ from: { opacity: 0, y: -5 }, to: { opacity: 1, y: 0 } });
  }, [children]);

  return <StyledParagraph style={styles}>{children}</StyledParagraph>;
};

const ParagraphAnimated2 = ({ children }) => {
  const [styles, animate] = useSpring(() => ({
    from: { y: -5 },
    to: { y: 0 },
  }));

  useEffect(() => {
    console.log(children.split(''));
    animate({ from: { y: -5 }, to: { y: 0 } });
  }, []);

  return (
    <StyledParagraph>
      {children.split('').map((letter, index) => (
        <span key={index} style={styles}>
          {letter}
        </span>
      ))}
    </StyledParagraph>
  );
};

export default function App() {
  const [text, setText] = useState('');
  const [start, setStart] = useState(true);
  const changeText = (text) => setText(text);

  const handleStartAnimation = () => setStart(!start);

  return (
    <div style={{ textAlign: 'center' }}>
      <Input handleChangeText={changeText} />
      <ParagraphAnimated>{text}</ParagraphAnimated>
      <button onClick={handleStartAnimation}>{start ? 'stop' : 'start'}</button>
      {start && <ParagraphAnimated2>{text}</ParagraphAnimated2>}
    </div>
  );
}
