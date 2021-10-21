import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Cards from './Cards';

const StyledInput = styled(animated.input)`
  padding: 10px 15px;
  font-size: 20px;
  text-align: center
`;

const StyledParagraph = styled(animated.p)`
  font-size: 45px;
  color: ${(props) => (props.content ? 'inherit' : '#ccc')}
`;

const Input = ({ handleChangeText, valueText }) => {
  // const [text, setText] = useState('');

  const onChangeValue = (input) => {
    const { value } = input.target;
    // setText(value);
    handleChangeText(value);
  };

  const onkeyUp = (input) => {
    console.log(input);
  };

  return (
    <StyledInput
      value={valueText}
      onChange={onChangeValue}
      onKeyPress={onkeyUp}
    />
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

const listPersons = [{ name: 'Miguel' }, { name: 'José' }, { name: 'Nicolas' }];

export default function App() {
  const [text, setText] = useState('');
  const [persons, setPersons] = useState(listPersons);
  const changeText = (text) => setText(text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== '') {
      addNewPerson(text);
      changeText('');
    }
  };

  const addNewPerson = (name) => {
    setPersons([...persons, { name }]);
  };

  const deletePerson = (index) => {
    const personsWithoutDelete = persons.filter((p) => p !== persons[index]);
    setPersons(personsWithoutDelete);
    // alert(index);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <Input handleChangeText={changeText} valueText={text} />
      </form>
      <Cards list={persons} handleDelete={deletePerson} />
      {/* <ParagraphAnimated placeholder="Ingrese su nombre.">
        {text}
      </ParagraphAnimated> */}
    </div>
  );
}
