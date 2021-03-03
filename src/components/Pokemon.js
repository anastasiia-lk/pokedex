import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Pokemon = ({ pokemon }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded text-center shadow mb-5 bg-white">
        <Link to={`/pokemon/${pokemon.id}`}>
          <Card.Img
            style={{ width: '8rem' }}
            src={pokemon.sprites.front_default}
            variant="top"
          />
        </Link>
      </Card>
    </>
  );
};

export default Pokemon;
