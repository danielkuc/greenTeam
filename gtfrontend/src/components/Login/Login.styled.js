import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const CARD = styled(Card)`
  background-color: rgba(0,0,0,0.4) !important;
  .card-header{
    background-color: rgba(0,0,0,0.3) !important;
    color:white;
  }
  .card-footer{
    a{
      text-decoration:none;
      color:orange;
    }
    a:hover{
      color:#e37910;
    }
    color:white;
    background-color: rgba(0,0,0,0.3) !important;
  }
  .invalid-feedback {
    color:orange;
  }
`

export {
  CARD
};