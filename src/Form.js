import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const CheckSVG = () => {
  const [flip, setFlip] = useState(false);
  const { x } = useSpring({
    reverse: flip,
    from: { x: 0 },
    x: 1,
    config: config.molasses,
  });

  return (
    <animated.svg
      style={{ width: 30, height: 30 }}
      viewBox="0 0 24 24"
      stroke="#808080"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={20}
      strokeDashoffset={x.to((x) => (1 - x) * 20)}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M5 13l4 4L19 7"
      />
    </animated.svg>
  );
};

const StyledForm = styled(animated.form)`
  display: block;
  background-color: #fff;
  padding: 10px;
  border-radius: 1rem;
  max-width: 450px;
`;

const StyledFormSection = styled.section`
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
`;

const StyledInput = styled(animated.input)`
  padding: 10px 15px;
  font-size: 20px;
  display: block;
  outline: none;
  border-radius: 1000px;
  border: none;
  background-color: #e8e8e8;
  color: #000;
  transform: translateY(-3px);
  box-shadow: 
      0 3px 0 0 #c4c4c4, inset 0 0 0 0 #c4c4c4;
  transition: 
    box-shadow .15s ease-in-out,
    transform .15s ease-in-out;

  &:not(:first-child) {
    margin-top: 1rem
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 2px 0 0 #c4c4c4, inset 0 0 0 0 #c4c4c4;
  }

  &:focus {
    transform: translateY(0);
    box-shadow: 
        0 0 0 0 #c4c4c4, inset 0 1px 2px 0 #c4c4c4;
  }
`;

const StyledCheckbox = styled.label`
  --width: 30px;
  --height: 30px;
  display: inline-block;
  width: var(--width);
  height: var(--height);
  border-radius: .5rem;
  background-color: #e8e8e8;
  cursor: pointer;
  transform: translateY(-3px);
  box-shadow: 
      0 3px 0 0 #c4c4c4, inset 0 0 0 0 #c4c4c4;
  transition: 
    box-shadow .15s ease-in-out,
    transform .15s ease-in-out;

  &:hover, &:hover:not(${({ checked }) => !checked}) {
    transform: translateY(-2px);
    box-shadow: 
        0 2px 0 0 #c4c4c4, inset 0 0 0 0 #c4c4c4;
  }

  &:active, &${({ checked }) => !checked} {
    transform: translateY(0);
    box-shadow: 
        0 0 0 0 #c4c4c4, inset 0 1px 2px 0 #c4c4c4;
  }

  & > span {
    position: absolute;
    left: calc(var(--width) + .5rem);
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    text-white: nowrap;
    vertical-align: middle;
  }

  & > svg {
    position: absolute;
    top: 0;
    left 0;
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
  background-color: #808080;
  color: #fff;
  transition: 
    box-shadow .15s ease-in-out,
    transform .15s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 3px 0 0 #232323, inset 0 0 0 0 #232323;
  }
  &:active, &:focus {
    transform: translateY(0);
    box-shadow: 0 0 0 0 #232323, inset 0 1px 2px 0 #232323;
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
  const [importanceCheckbox, setImportanceCheckbox] = useState(false);
  const changeText = (text) => setText(text);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text !== '') {
      const task = { title: text, importance: importanceCheckbox };
      handleNewTask(task);
      changeText('');
      setImportanceCheckbox(false);
    }
  };

  const handleChangeCheckbox = (e) => {
    const { checked } = e.target;
    console.log({ checked });
    setImportanceCheckbox(checked);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormSection>
        <Input handleChangeText={changeText} valueText={text} />
      </StyledFormSection>
      <StyledFormSection>
        <input
          id="important"
          type="checkbox"
          checked={importanceCheckbox}
          onChange={handleChangeCheckbox}
          hidden
        />
        <StyledCheckbox htmlFor="important" checked={importanceCheckbox}>
          <span>Important</span>
          {importanceCheckbox && <CheckSVG />}
        </StyledCheckbox>
      </StyledFormSection>
      {/* <Input handleChangeText={changeText} valueText={text} type="datetime" /> */}
      <StyledButtonSubmit type="submit">➕ Add Task</StyledButtonSubmit>
    </StyledForm>
  );
}
