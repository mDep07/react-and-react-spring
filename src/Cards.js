import React, { useState, useEffect } from 'react';
import './style.css';

import styled, { keyframes } from 'styled-components';
import { useSpring, useSprings, useSpringRef, animated } from 'react-spring';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledListCards = styled(animated.section)`
  margin: 0 auto;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 80%;
  @media(max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(animated.div)`
  position: relative;
  padding: .5rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 
    0 0 0 1px #adadad, 
    2px 2px 0 1px #adadad,
    4px 4px 0 1px #adadad,
    6px 6px 0 1px #adadad;
  text-align: left;
  color: #424242;
  transition: box-shadow .15s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 0 0 1px #adadad, 
      0 0 0 1px #adadad,
      0 0 0 1px #adadad,
      2px 2px 0 1px #adadad;
  }

  &.loading::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    background: rgba(255,255,255, .75);
    z-index: 2;
  }

  &.loading::after {
    position: absolute;
    content: '';
    width: 35px;
    height: 35px;
    top: calc(50% - calc(45px / 2));
    left: calc(50% - calc(45px / 2));
    background: transparent;
    border: 5px solid #232323;
    border-left-color: transparent;
    animation: ${rotate} .75s linear infinite;
    border-radius: 1000px;
    z-index: 3;
  }
`;

const StyledButtonCard = styled(animated.button)`
  position: relative;
  cursor: pointer;
  border: none;
  background: ${({ color }) => (!color ? '#8f1a4f' : color)};
  padding: .5rem 0;
  width: 100px;
  font-size: .7em;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  border-radius: 100px;
  color: #fff;
  transition: 
    box-shadow .15s ease-in-out,
    transform .15s ease-in-out,
    padding-left .15s ease-in-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
    0 3px 0 0 ${({ color2 }) =>
      !color2 ? '#3d051e' : color2}, inset 0 0 0 0 ${({ color2 }) =>
  !color2 ? '#3d051e' : color2};
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 0 0 0 ${({ color2 }) =>
      !color2 ? '#3d051e' : color2}, inset 0 1px 2px 0 ${({ color2 }) =>
  !color2 ? '#3d051e' : color2};
  }

  & > span {
    
  }
`;

export default function Cards({ list, handleDelete }) {
  const [listAnimation, api] = useSprings(list.length, (index) => ({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
  }));

  const [cardLoading, setCardLoading] = useState([]);

  const cancelCardLoading = (index) => {
    const cardLoadingWithoutCancel = cardLoading.filter(
      (c) => c !== cardLoading[index]
    );
    setCardLoading(cardLoadingWithoutCancel);
  };

  const handleFinishTask = (id) => {
    console.log(id);
    setCardLoading([...cardLoading, id]);
  };

  const deleteTask = (id) => {
    setCardLoading([...cardLoading, id]);
    handleDelete(id).then(cancelCardLoading);
  };

  return (
    <StyledListCards>
      {listAnimation.map((styles, i) => {
        const task = list[i];
        return (
          <StyledCard
            style={styles}
            key={task.id}
            className={cardLoading.includes(task.id) ? 'loading' : ''}
          >
            <p>
              {task.title}{' '}
              {task.importance && (
                <strong style={{ color: 'orange' }}>!important</strong>
              )}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 5,
                marginTop: 20,
              }}
            >
              <StyledButtonCard
                color="#DC0404"
                color2="#780202"
                onClick={() => deleteTask(task.id)}
              >
                <span>❌</span> Delete
              </StyledButtonCard>
              {/* <StyledButtonCard color="#2d60cf" color2="#173a87">
                <span>✍</span> Edit
              </StyledButtonCard> */}
              <StyledButtonCard
                onClick={() => handleFinishTask(task.id)}
                color="#70C321"
                color2="#477C15"
              >
                <span>✅</span> Finish
              </StyledButtonCard>
            </div>
          </StyledCard>
        );
      })}
      <p>{listAnimation.length === 0 && 'Sin cards'}</p>
    </StyledListCards>
  );
}
