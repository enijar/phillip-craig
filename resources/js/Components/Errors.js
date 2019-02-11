import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  p {
    color: #eb4747;
  }
`;

Errors.propTypes = {
    errors: PropTypes.array,
};

Errors.defaultProps = {
    errors: [],
};

export default function Errors(props) {
    if (props.errors.length === 0) {
        return null;
    }

    return (
        <Container>
            {props.errors.map((error, index) => (
                <p key={`error-${index}`}>
                    {error}
                </p>
            ))}
        </Container>
    );
}
