import styled from 'styled-components';

const StyledRegister = styled.div`
  background-color: #defcea ;
  height: 100% ;

  .error{
    color:red;
  }
  .wrapper{
    background-color: #056311 ;
    border-radius:0.2rem;
    color: white;
  }

  form{
    font-size: large;
  }
  form div{
    padding:0.2rem 0;
  }

  input, select{
    border-radius:20px;
  }

  button {
    border-radius:20px;
  }
`

export default StyledRegister;