import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #47eba2;
  margin-bottom: 1rem;
`;

Message.propTypes = {
    message: PropTypes.string,
};

Message.defaultProps = {
    message: null,
};

export default function Message(props) {
    if (!props.message) {
        return null;
    }

    return (
        <Container>
            {props.message}
        </Container>
    );
}
