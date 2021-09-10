import { Container } from "react-bootstrap";
import styled from "styled-components";

const CONTAINER = styled(Container)`
  font-size:20px;
.card {
  // background-color: rgba(0,0,0,0.4) !important;
  letter-spacing:1.5px;
  a{
    text-decoration:none;
    color:orange;
  }
  a:hover{
    color:#e37910;
  }
`;

export default  CONTAINER;