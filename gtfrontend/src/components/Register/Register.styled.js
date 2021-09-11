import styled from 'styled-components';
import { Container, Modal } from 'react-bootstrap';

const CONTAINER = styled(Container)`

.form-floating {
  margin-top:1rem;
}
a{
  text-decoration:none;
  color:orange;
}
a:hover{
  color:#e37910;
}

.card {
  background-color: rgba(0,0,0,0.4) !important;
  
  .card-header{
    background-color: rgba(0,0,0,0.3) !important;
    color:white;
  }
  
  .card-footer{
    color:white;
    background-color: rgba(0,0,0,0.3) !important;
  }
  .invalid-feedback {
    color:orange;
  }
}

`;

const MODAL = styled(Modal)`
  
`;

export {
  CONTAINER,
  MODAL
};