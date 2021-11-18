import React from 'react'
import MODAL from './DisplayModal.styled';
import { Button, Link, Modal } from 'react-bootstrap';

const DisplayModal = ({body, redirect , state, setState, success, message}) => {
  const handleClick = () => {
    setState(true);
  }

  return (
    <MODAL 
    show={state}
    centered
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header>
      <Modal.Title>
        {success}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {body}
    </Modal.Body>
    <Modal.Footer >
      {/* <Link to="/home" className="mx-auto"> */}
        <Button onClick={handleClick} variant="warning" >{message}</Button>
      {/* </Link> */}
    </Modal.Footer>
  </MODAL>
)

}

export default DisplayModal;
