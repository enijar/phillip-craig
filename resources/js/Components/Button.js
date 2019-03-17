import React from "react";
import styled, {css} from "styled-components";

export default styled.button`
  background-color: #eb4747;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
  padding: 0.4585em 0.8em;
  border-radius: 5px;
  border: 3px solid #eb4747;
  cursor: pointer;
  
  ${props => props.small && css`
    font-size: 0.8rem;
  `}
  
  :focus {
    outline: none;
    border: 3px solid #fff;
  }
  
  ${props => props.cart && css`
    display: block;
    
    :focus {
      outline: none;
      border: 3px solid #eb4747;
    }
  `}
  
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
