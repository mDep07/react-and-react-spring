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

const Paragraph = ({ children }) => {
  const [styles, animate] = useSpring(() => ({
    from: { opacity: 0, y: -5 },
    to: { opacity: 1, y: 0 },
  }));

  useEffect(() => {
    console.log(children);
    animate({ from: { opacity: 0, y: -5 }, to: { opacity: 1, y: 0 } });
  }, [children]);

  return <StyledParagraph style={styles}>{children}</StyledParagraph>;
};

export default function App() {
  const [text, setText] = useState('a');
  const changeText = (text) => setText(text);

  return (
    <div style={{ textAlign: 'center' }}>
      <Input handleChangeText={changeText} />
      <Paragraph>{text}</Paragraph>
    </div>
  );
}
