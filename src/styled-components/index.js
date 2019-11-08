import styled from 'styled-components'

const StyledHome = styled.div`
  width: 600px;
  padding: 12px;
  margin: auto;
  margin-top: 5%;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  align-items: center;

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .links a {
    text-decoration: none;
    text-align: center;
    color: black;
    width: 100%;
    font-weight: 700;
    letter-spacing: 0.8px;
    padding: 8px;
    border-radius: 3px;
  }

  .links .active {
    background-color: gray;
    color: white;
  }
`

const StyledForm = styled.form`
  padding: 32px;

  label,
  input {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 16px;
    letter-spacing: 0.3px;
    margin-top: 14px;
  }
`

const StyledInput = styled.input`
  width: 100%;
  font-size: 17px;
  outline: none;
  letter-spacing: 0.3px;
  border: ${props => props.color || '1.5px solid lightgrey'};
  border-radius: 3px;
  padding: 10px;

  &:focus {
    border: ${props => props.color || '1.5px solid grey'};
  }
`

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  color: white;
  background-color: gray;
  border-radius: 3px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.4px;
  margin-top: 30px;
  cursor: pointer;
`

const StyledCountryDiv = styled.div`
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow: scroll;
  border-radius: 4px;

  p {
    margin: 4px 8px;
    border-radius: 2px;
    color: #7d8b9b;
    font-size: 15px;
    padding: 7px 13px;
    cursor: pointer;
    transition: all 0.3ms ease-out;
  }

  p:hover {
    color: #ffffff;
    background-color: gray;
    -webkit-box-shadow: 0 6px 15px 0 rgba(29, 25, 122, 0.2);
    box-shadow: 0 6px 15px 0 rgba(29, 25, 122, 0.2);
  }
`

const StyledAlert = styled.div`
 padding: 15px;
 border-radius: 3px;
 margin-top: 18px;
 background-color: ${props => props.error ? '#f8d7da' : '#d4edda'}
`;

export { StyledHome, StyledForm, StyledInput, StyledButton, StyledCountryDiv, StyledAlert }
