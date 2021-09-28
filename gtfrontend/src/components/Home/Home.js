import CONTAINER from "./Home.styled";
import React from 'react';
import { Button ,Card, Col, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import apiClient from "../../services/api";
import axios from "axios";

const Home = () => {
  const fetchUser = async () => {
    await axios.post('http://localhost:8000/api/me').then(response => 
        console.log(response)
      )
  }

  const important = [
    {
      headline: 'Clinical information',
      body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore possimus magni at aliquam laborum, laudantium quis perferendis est assumenda porro temporibus distinctio fugiat labore, obcaecati officiis sint quasi, nam expedita sequi suscipit! Deserunt laborum, rem eos amet dignissimos optio, laudantium quaerat illo a soluta, placeat aliquam neque explicabo porro!'
    },
    {
      headline: 'New operating procedures',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quos vitae? Beatae praesentium, unde nobis aspernatur rem sequi magnam cum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quos vitae? Beatae praesentium, unde nobis aspernatur rem sequi magnam cum!'
    },
    {
      headline:'Store updates',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dignissimos sit modi est at harum amet asperiores molestiae nemo, esse autem eaque mollitia quod omnis fugiat, voluptatum iusto officiis cumque! Cum, nulla impedit. Cupiditate nobis exercitationem, consequuntur recusandae error ducimus delectus quasi nisi veritatis at quaerat amet perferendis iste dolore deleniti repellendus nesciunt est odio.'
    }
  ];

  const minor = [
    {
      head: 'Headline Placeholder #1',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nostrum, suscipit impedit dignissimos, dolor voluptatem voluptate quasi quibusdam minus amet fuga consectetur possimus a neque.'
    },
    {
      head: 'Headline Placeholder #2',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni labore aliquid perspiciatis accusamus alias necessitatibus numquam architecto commodi deleniti. Optio suscipit aliquid corrupti exercitationem minus!'
    },
    {
      head: 'Headline Placeholder #3',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto corporis, ad hic voluptate reprehenderit obcaecati impedit necessitatibus in dicta magni, qui quas odio non?'
    },
    {
      head: 'HeadlinePlaceholder #4',
      body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus aliquam assumenda nobis explicabo nostrum architecto harum alias delectus, tempora hic quidem odit nam deserunt inventore.'
    }
  ];

  return (
    <CONTAINER fluid="sm">
      <Row className="important justify-content-center">
        <p className="h1 text-center pb-4">Key updates</p>
        <Button
          variant="primary"
          onClick={fetchUser}
        >Click</Button>
        {
          important.map((article, index) => {return(
            <Col key={index} sm={10} lg={4}>
            <Card>
                <CardHeader>
                  <Card.Title>
                    {`${article.headline}`}
                  </Card.Title>
                </CardHeader>
                <Card.Body>
                  {`${article.body}`}
                </Card.Body>
              </Card>
            </Col>
          )})
        }
      </Row>
      <Row className="secondary justify-content-center">
        <p className="h2 text-center py-5">Other updates</p>
        {
          minor.map((article, index) => { return(
            <Col key={index} sm={10} lg={3}>
              <Card>
                <CardHeader>
                  <Card.Title>
                    {`${article.head}`}
                  </Card.Title>
                </CardHeader>
                <Card.Body>
                  {`${article.body}`}
                </Card.Body>
              </Card>
            </Col>
            )
          })
        }
      </Row>      
    </CONTAINER>
  )
}

export default Home;
