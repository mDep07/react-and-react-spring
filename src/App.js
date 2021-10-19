import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledInput = styled(animated.input)`
  padding: 10px 15px;
  font-size: 20px;
  text-align: center
`;

const StyledParagraph = styled(animated.p)`
  font-size: 45px;
  color: ${(props) => (props.content ? 'inherit' : '#ccc')}
`;

const Input = ({ handleChangeText }) => {
  const [text, setText] = useState('');

  const onChangeValue = (input) => {
    const { value } = input.target;
    setText(value);
    handleChangeText(value);
  };

  const onkeyUp = (input) => {
    console.log(input);
  };

  return (
    <StyledInput value={text} onChange={onChangeValue} onKeyPress={onkeyUp} />
  );
};

const ParagraphAnimated = ({ children, placeholder }) => {
  const [styles, animate] = useSpring(() => ({
    from: { opacity: 0, y: -5 },
    to: { opacity: 1, y: 0 },
  }));

  useEffect(() => {
    animate({ from: { opacity: 0, y: -5 }, to: { opacity: 1, y: 0 } });
  }, [children]);

  return (
    <StyledParagraph content={!!children} style={styles}>
      {children || placeholder}
    </StyledParagraph>
  );
};

const ParagraphAnimated2 = ({ children, placeholder }) => {
  const [styles, animate] = useSpring(() => ({
    from: { opacity: 0, y: -5 },
    to: { opacity: 1, y: 0 },
  }));

  useEffect(() => {
    animate({ from: { opacity: 0, y: -5 }, to: { opacity: 1, y: 0 } });
  }, [children]);

  return (
    <StyledParagraph content={!!children} style={styles}>
      {children || placeholder}
    </StyledParagraph>
  );
};

export default function App() {
  const [text, setText] = useState('');
  const [start, setStart] = useState(true);
  const changeText = (text) => setText(text);

  return (
    <div style={{ textAlign: 'center' }}>
      <Input handleChangeText={changeText} />
      <ParagraphAnimated placeholder="Ingrese su nombre.">
        {text}
      </ParagraphAnimated>
    </div>
  );
}
