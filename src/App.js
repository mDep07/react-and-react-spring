import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Db from './Db';
import Cards from './Cards';
import Form from './Form';

const size = {
  xs: '320px',
  sm: '768px',
  lg: '1200px',
};
export const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  lg: `(min-width: ${size.lg})`,
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justifyContent: center;
  gap: 1rem;

  @media screen and ${device.sm} {
    flex-direction: row;
  }
`;

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

export default function App() {
  const db = Db();
  const initialState = db.getAllTasks();
  const [tasks, setTasks] = useState(initialState);

  const addNewTask = (newTask) => {
    db.addNewTask(newTask)
      .then((task) => setTasks([...tasks, task]))
      .catch((err) => console.log('err', err));
  };

  const deleteTask = async (taskId) => {
    const deleteTaskID = await db.deleteTask(taskId);

    const tasksWithoutDelete = tasks.filter((t) => t.id !== deleteTaskID);
    setTasks(tasksWithoutDelete);

    return deleteTaskID;
  };

  return (
    <StyledContainer>
      <Form handleNewTask={addNewTask} />
      <Cards list={tasks} handleDelete={deleteTask} />
      {/* <ParagraphAnimated placeholder="Ingrese su nombre.">
        {text}
      </ParagraphAnimated> */}
    </StyledContainer>
  );
}
