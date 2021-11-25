import styled from "styled-components";
import { Modal } from "react-bootstrap";

const MODAL = styled(Modal)`
.modal-header, .modal-footer{
  background-color:#198754;
}  

.modal-body p
  {
    font-size:1.5rem;
  }
`;

export default MODAL;