import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const CONTAINER = styled(Container)`
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

.popup {
  color: orange;
  font-size:large;
}
`;

export default CONTAINER;