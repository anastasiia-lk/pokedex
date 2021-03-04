import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Components
import Loader from '../components/Loader';

const PokemonPage = ({ match }) => {
  const id = match.params.id;
  const [pokemonDetails, setPokemonDetails] = useState();
  const [pokemonEvolutionDetails, setPokemonEvolutionDetails] = useState();
  const [loading, setLoading] = useState('true');

  // const getPokemon = async (id) => {
  //   const details = await getPokemonData(id);
  //   setPokemonDetails(details.data);
  //   setLoading(false);
  // };

  // const getPokemon = async (id) => {
  //   const details = await getPokemonData(id);
  //   const evolutions = await getPokemonEvolutionData(id);
  //   setPokemonDetails(details.data);
  //   // setPokemonEvolutionDetails(evolutions.data);
  //   setLoading(false);
  //   console.log(evolutions.data);
  // };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  // const getEvolutionList = (obj) => {
  //   const values = Object.values(obj);
  //   const output = [];

  //   values.forEach((val) => {
  //     // val != 'species' && typeof val === 'object'
  //     val && val === 'object' &&
  //       ? getEvolutionList(obj)
  //       : output.push(val.name);
  //   });

  //   return output;
  // };

  // const getEvolutionList = (obj) => {
  //   let output = [];
  //   let val = Object.values(obj);
  //   output.push(val[3].name);
  //   let val_1 = Object.values(val[1]);
  //   output.push(val_1[0].species.name);
  //   let val_2 = Object.values(val_1[0].evolves_to)
  //     ? Object.values(val_1[0].evolves_to)
  //     : [];
  //   // let val_2 = Object.values(val_1[0].evolves_to);
  //   output.push(val_2[0].species.name);
  // let val_1 = Object.values(val[0].evolves_to);
  // output.push(val_1[0].species.name);
  // let val_2 = Object.values(val_1[0].evolves_to);
  // output.push(val_2[0].species.name);

  // await values.forEach(
  //   (val) =>
  //     val.species.name
  //       ? output.push(val.species.name)
  //       : getEvolutionList(val.evolves_to),
  // val != 'species' && typeof val === 'object'
  // val.name ? getEvolutionList(val) : output.push(val.name);
  // );

  //   return output;
  // };

  const getPokemonEvolutionData = async (id) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    return res;
  };

  const getPokemonEvolutionDataDetail = async (id) => {
    const res = await axios.get(`${id}`);
    return res;
  };

  // const getPokemonEvolutionData_1 = async (id) => {
  //   const response = await fetch(
  //     `https://pokeapi.co/api/v2/pokemon-species/${id}`,
  //   );
  //   const results = await response.json();
  //   console.log(results.evolution_chain.url);
  //   const res = await fetch(`${results.evolution_chain.url}`);
  //   const res_1 = await res.json();
  //   // console.log(res_1);
  //   // console.log(res_1.chain.evolves_to[0].species.name);
  //   console.log(res_1.chain);
  //   console.log(Object.values(res_1.chain));
  //   const x = await getEvolutionList(res_1.chain);
  //   // console.log(x);
  //   // const x = Object.values(res_1.chain);
  //   // const y = Object.keys(res_1.chain);
  //   // console.log(x);
  //   // console.log(y);
  //   // const list = await getEvolutionList(res_1.chain);
  //   // setPokemonEvolutionDetails(x);
  //   return x;
  // };

  useEffect(() => {
    const getPokemon = async (id) => {
      const details = await getPokemonData(id);
      const evolutions = await getPokemonEvolutionData(id);
      const evolutionsDetails = await getPokemonEvolutionDataDetail(
        evolutions.data.evolution_chain.url,
      );
      let output = [];
      let val = Object.values(evolutionsDetails.data.chain);
      output.push(val[3].name);
      let val_1 = Object.values(val[1]);
      output.push(val_1[0].species.name);
      let val_2 = Object.values(val_1[0].evolves_to)
        ? Object.values(val_1[0].evolves_to)
        : [];
      // let val_2 = Object.values(val_1[0].evolves_to);
      output.push(val_2[0].species.name);
      setPokemonDetails(details.data);
      setPokemonEvolutionDetails(output);
      setLoading(false);
      console.log(evolutions.data);
    };
    getPokemon(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: 'none' }}
            >
              <Link to={`/pokemon/${pokemonDetails.id}`}>
                <Card.Img
                  style={{ width: '15rem' }}
                  src={pokemonDetails.sprites.front_default}
                  variant="top"
                />
              </Link>
              <Card.Body
                className={`${pokemonDetails.types[0].type.name} rounded text-white`}
              >
                <Link
                  to={`/pokemon/${pokemonDetails.id}`}
                  className="link-name"
                >
                  <Card.Title as="div">
                    <strong>
                      #{pokemonDetails.id}{' '}
                      {pokemonDetails.name.charAt(0).toUpperCase() +
                        pokemonDetails.name.slice(1)}
                    </strong>
                  </Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: 'none' }}
            >
              <Card.Body>
                <Card.Text>
                  <Row>
                    {pokemonDetails.types.map((t) => (
                      <Col key={t.type.name}>
                        <div
                          className={`${t.type.name} rounded px-4 py-1`}
                          style={{ color: 'white' }}
                        >
                          {t.type.name.toUpperCase()}
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col>
                      <Card.Img
                        style={{ width: '15rem' }}
                        src={pokemonDetails.sprites.front_default}
                        variant="top"
                      />
                      <Card.Text>Normal Form</Card.Text>
                    </Col>
                    <Col>
                      <Card.Img
                        style={{ width: '15rem' }}
                        src={pokemonDetails.sprites.front_shiny}
                        variant="top"
                      />
                      <Card.Text>Shiny Form</Card.Text>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div
                        className="px-4 py-1 rounded"
                        style={{ border: '1px black solid' }}
                      >
                        Abilities
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center">
                    {pokemonDetails.abilities.map((a) => (
                      <Col
                        key={a.ability.name}
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <div className="rounded px-4 py-1">
                          {a.ability.name.toUpperCase()}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: 'none' }}
            >
              <Card.Body>
                <Row className="mt-4 text-center">
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div
                      className="px-4 py-1 rounded"
                      style={{ border: '1px black solid' }}
                    >
                      Base Stats
                    </div>
                  </Col>
                </Row>
                <Row className="text-center ">
                  {pokemonDetails.stats.map((a, key) => (
                    <div key={key} className="px-4 py-1 rounded">
                      <strong>{a.stat.name}</strong>
                      <ProgressBar
                        now={a.base_stat}
                        max={255}
                        label={a.base_stat}
                      />
                    </div>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: 'none' }}
            >
              <Card.Body>
                <Row className="mt-4 text-center">
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div
                      className="px-4 py-1 rounded"
                      style={{ border: '1px black solid' }}
                    >
                      Moves
                    </div>
                  </Col>
                </Row>
                <Row className="text-center ">
                  <ListGroup>
                    {pokemonDetails.moves.map((a, key) => (
                      <ListGroup.Item>
                        {a.move.name.toUpperCase()}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: 'none' }}
            >
              <Card.Body>
                <Row className="mt-4 text-center">
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div
                      className="px-4 py-1 rounded"
                      style={{ border: '1px black solid' }}
                    >
                      Evolutions
                    </div>
                  </Col>
                </Row>
                <Row className="text-center ">
                  <ListGroup>
                    {pokemonEvolutionDetails.map((a, key) => (
                      <ListGroup.Item>{a.toUpperCase()}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PokemonPage;
