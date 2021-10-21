import React, { useState, useEffect } from 'react';
import './style.css';

import styled from 'styled-components';
import { useSpring, useSprings, useTransition, animated } from 'react-spring';

const StyledListCards = styled(animated.section)`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  cursor: pointer;
  border: none;
  background: #8f1a4f;
  padding: .45rem;
  font-size: 1em;
  display: block;
  width: 100%;
  border-radius: 100px;
  color: #fff;
  transition: 
    box-shadow .15s ease-in-out,
    transform .15s ease-in-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 0 0 #470c27, inset 0 0 0 0 #470c27;
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 0 0 0 #470c27, inset 0 1px 2px 0 #470c27;
  }
`;

export default function Cards({ list, handleDelete }) {
  const [listAnimation, set] = useSprings(list.length, (index) => ({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
  }));

  useEffect(() => {
    // set((index) => ({
    //   from: { opacity: 0, y: -10 },
    //   to: { opacity: 1, y: 0 },
    //   delay: 100,
    // }));
  }, [list]);

  return (
    <StyledListCards>
      {listAnimation.map((styles, i) => (
        <StyledCard style={styles} key={i}>
          <h1>{list[i].name}</h1>
          <StyledButtonCard onClick={() => handleDelete(i)}>
            Eliminar
          </StyledButtonCard>
        </StyledCard>
      ))}
    </StyledListCards>
  );
}
