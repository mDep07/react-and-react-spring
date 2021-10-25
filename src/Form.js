import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledForm = styled(animated.form)`
  background-color: #fff;
  padding: 10px;
  border-radius: 1rem;
`;

const StyledInput = styled(animated.input)`
  padding: 10px 15px;
  font-size: 20px;
  display: block;
  outline: none;
  &:not(:first-child) {
    margin-top: 1rem
  }
`;

const StyledButtonSubmit = styled(animated.button)`
  padding: 10px 15px;
  margin-top: 1rem;
  font-size: 20px;
  display: block;
  width: 100%;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  background-color: #ebebeb;
  color: #808080;
  transition: all .25s ease-in-out;
  &:hover {
    background-color: #808080;
    color: #ebebeb;
  }
`;

const Input = ({ handleChangeText, valueText }) => {
  const onChangeValue = (input) => {
    const { value } = input.target;
    handleChangeText(value);
  };

  // const onkeyUp = (input) => {
  //   // console.log(input);
  // };

  return <StyledInput value={valueText} onChange={onChangeValue} />;
};

export default function Form({ handleNewTask }) {
  const [text, setText] = useState('');
  const changeText = (text) => setText(text);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text !== '') {
      const task = { title: text, fixed: false };
      handleNewTask(task);
      changeText('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input handleChangeText={changeText} valueText={text} />
      {/* <Input handleChangeText={changeText} valueText={text} type="datetime" /> */}
      <StyledButtonSubmit type="submit">Add Task</StyledButtonSubmit>
    </StyledForm>
  );
}
