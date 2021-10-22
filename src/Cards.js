import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, useSprings, useSpringRef, animated } from 'react-spring';

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
  padding: .5rem;
  border-radius: 1.5rem;
  background-color: #fff;
  box-shadow: 0 1px 15px #dedede;
  color: #424242;
  transition: box-shadow .15s ease-in-out;
  &:hover {
    box-shadow: 0 2px 5px #b5b5b5, 0 5px 15px #d9d9d9;
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

  return (
    <StyledListCards>
      {listAnimation.map((styles, i) => (
        <StyledCard style={styles} key={i}>
          <h1>{list[i].name}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
            <StyledButtonCard
              color="#DC0404"
              color2="#780202"
              onClick={() => handleDelete(i)}
            >
              <span>❌</span> Eliminar
            </StyledButtonCard>
            <StyledButtonCard color="#2d60cf" color2="#173a87">
              <span>✍</span> Editar
            </StyledButtonCard>
            <StyledButtonCard color="#70C321" color2="#477C15">
              <span>✅</span> Terminar
            </StyledButtonCard>
          </div>
        </StyledCard>
      ))}
      <p>{listAnimation.length === 0 && 'Sin cards'}</p>
    </StyledListCards>
  );
}
