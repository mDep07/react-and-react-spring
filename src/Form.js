import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const CheckSVG = () => {
  const [flip, set] = useState(false);
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
  background-color: #fff;
  padding: 10px;
  border-radius: 1rem;
`;

const StyledFormSection = styled.section`
  margin-bottom: 1rem;
  width: 100%;
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
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: .5rem;
  background-color: #e8e8e8;
  transform: translateY(-3px);
  box-shadow: 
      0 3px 0 0 #c4c4c4, inset 0 0 0 0 #c4c4c4;
  transition: 
    box-shadow .15s ease-in-out,
    transform .15s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 2px 0 0 #c4c4c4, inset 0 0 0 0 #c4c4c4;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
        0 0 0 0 #c4c4c4, inset 0 1px 2px 0 #c4c4c4;
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
  &:active {
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
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const changeText = (text) => setText(text);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text !== '') {
      const task = { title: text, importance: true };
      handleNewTask(task);
      changeText('');
    }
  };

  const handleChangeCheckbox = (e) => {
    const { checked } = e.target;
    console.log({ checked });
    setCheckedCheckbox(checked);
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
          checked={checkedCheckbox}
          onChange={handleChangeCheckbox}
          hidden
        />
        <StyledCheckbox htmlFor="important" checked={checkedCheckbox}>
          {checkedCheckbox && <CheckSVG />}
        </StyledCheckbox>
      </StyledFormSection>
      {/* <Input handleChangeText={changeText} valueText={text} type="datetime" /> */}
      <StyledButtonSubmit type="submit">➕ Add Task</StyledButtonSubmit>
    </StyledForm>
  );
}
