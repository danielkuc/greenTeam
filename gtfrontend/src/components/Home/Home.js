import CONTAINER from "./Home.styled";
import React from 'react';
import { Card, Col, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Home = () => {
  const important = [
    {
      headline: 'Clinical information',
      body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore possimus magni at aliquam laborum, laudantium quis perferendis est assumenda porro temporibus distinctio fugiat labore, obcaecati officiis sint quasi, nam expedita sequi suscipit! Deserunt laborum, rem eos amet dignissimos optio, laudantium quaerat illo a soluta, placeat aliquam neque explicabo porro!'
    },
    {
      headline: 'New operating procedures',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quos vitae? Beatae praesentium, unde nobis aspernatur rem sequi magnam cum!'
    },
    {
      headline:'Store updates',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dignissimos sit modi est at harum amet asperiores molestiae nemo, esse autem eaque mollitia quod omnis fugiat, voluptatum iusto officiis cumque! Cum, nulla impedit. Cupiditate nobis exercitationem, consequuntur recusandae error ducimus delectus quasi nisi veritatis at quaerat amet perferendis iste dolore deleniti repellendus nesciunt est odio. Nostrum expedita ipsam ducimus odio.'
    }
  ];


  return (
    <CONTAINER fluid="sm">
      <Row className="important">
        {
          important.map(item => {return(
            <Col>
              <CardHeader>
                <Card.Title>
                  {`${item.headline}`}
                </Card.Title>
              </CardHeader>
            </Col>
          )})
        }
      </Row>      
    </CONTAINER>
  )
}

export default Home;
