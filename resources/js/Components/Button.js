import React from "react";
import styled from "styled-components";

export default styled.button`
  background-color: #eb4747;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
  padding: 0.688rem;
  border-radius: 5px;
  border: 3px solid #eb4747;
  cursor: pointer;
  
  :focus {
    outline: none;
    border: 3px solid #fff;
  }
  
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
