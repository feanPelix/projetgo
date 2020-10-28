import React, { useState } from 'react';
import { Col, InputGroup, Form } from 'react-bootstrap';
import ButtonPG from '../../Buttons/ButtonPG/ButtonPG';

export default function NewFundraising({ history, match }) {
  const { projectId } = match.params;
  const initialState = {
    start: '',
    end: '',
    goal: '',
  };

  const [data, setData] = useState(initialState);
  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      //Write request
      const response = await fetch(`/project/${projectId}/campaign`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId,
          start: data.start,
          end: data.end,
          goal: data.goal,
        }),
      });

      if (!response.ok) {
        throw response;
      }
      
      history.go(-1);

    } catch (error) {
      console.error(error.message || error.statusText);
    }
  };

  
  
  return (
    <Form onSubmit={handleFormSubmit}>
      <h2>Nouvelle campagne</h2>
      <Form.Row>
        <Col sm={4}>
          <Form.Label
            htmlFor="inlineFormInputBegin"
          >
            Début
          </Form.Label>
          <Form.Control
            className="mb-2"
            type="date" 
            id="start"
            name="start"
            value={data.start}
            onChange={handleChange}
          />
        </Col>
        <Col sm={4}>
          <Form.Label
            htmlFor="inlineFormInputEnd"          
          >
            Fin
          </Form.Label>
          <Form.Control
            className="mb-2"
            type="date"
            id="end"
            name="end"
            value={data.end}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Label
            htmlFor="inlineFormInputAmount"
          >
            Objectif
          </Form.Label>
          <InputGroup
            className="mb-2"
          >
            <Form.Control
              type="number" 
              id="amount"
              min="5" 
              placeholder="Montant"
              name="goal"
              value={data.goal}
              onChange={handleChange}
            />
            <InputGroup.Append>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Row>
      <Form.Row>      
        <Col sm={{offset:7}}>
          <ButtonPG 
            variant="teal"
            size="md"
            type="button"
            onClick={() => history.go(-1)}
          >
            Annuler
          </ButtonPG>
        </Col>
        <Col>
          <ButtonPG
            size="md"
            type="submit"
          >
            Valider
          </ButtonPG>
        </Col>
      </Form.Row>
    </Form>
  );
}