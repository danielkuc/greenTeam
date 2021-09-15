import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const CONTAINER = styled(Container) `
.card {
  background-color: rgba(0,0,0,0.4) !important;
}
.card-header{
  background-color: rgba(0,0,0,0.3) !important;
  color:white;
}

.invalid-feedback {
  color:orange;
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
`;

export default CONTAINER;