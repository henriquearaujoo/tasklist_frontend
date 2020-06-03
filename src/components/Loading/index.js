import React from "react";
import PropTypes from "prop-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Container } from "./styles";

export default function Loading({ tamanho }) {
  return (
    <Container>
      <AiOutlineLoading3Quarters size={tamanho} />
    </Container>
  );
}

Loading.propTypes = {
  tamanho: PropTypes.number.isRequired,
};
