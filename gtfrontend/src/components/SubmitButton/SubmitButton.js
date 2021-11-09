import { Button ,Form } from "react-bootstrap";


const SubmitButton = ({ state, variant, text, size, marginY }) => {
    
  return (
    <>
      <Form.Group className={`${marginY || "my-2"}`}>
        <Button
          type="submit"
          variant={`${variant || "warning"}`}
          size={`${size || "lg"}`}
          disabled={state}
          >
          {!state ? `${text || "Submit"}` : 'Loading...'}
        </Button>
      </Form.Group>
    </>
  )
}

export default SubmitButton
