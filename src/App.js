import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Cards from './Cards';
import Form from './Form';

const StyledParagraph = styled(animated.p)`
  font-size: 45px;
  color: ${(props) => (props.content ? 'inherit' : '#ccc')}
`;

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

const listTask = [{ title: 'Miguel' }, { title: 'José' }, { title: 'Nicolas' }];

export default function App() {
  const [tasks, setTasks] = useState(listTask);

  const addNewTask = ({ title }) => {
    setTasks([...tasks, { title }]);
  };

  const deleteTask = (index) => {
    const tasksWithoutDelete = tasks.filter((p) => p !== tasks[index]);
    setTasks(tasksWithoutDelete);
    // alert(index);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Form handleNewTask={addNewTask} />
      <Cards list={tasks} handleDelete={deleteTask} />
      {/* <ParagraphAnimated placeholder="Ingrese su nombre.">
        {text}
      </ParagraphAnimated> */}
    </div>
  );
}
