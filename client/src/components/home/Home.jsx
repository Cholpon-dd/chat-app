import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bg from '../../assets/277408.jpg';

const Home = ({ socket, setInfo }) => {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const joinRoom = (e) => {
    e.preventDefault();
    if (userName !== '' && room !== '') {
      socket.emit('joined', { userName, room });
      setInfo(userName);
      setUserName('');
      setRoom('');
      navigate('/chat');
    }
  };

  return (
    <Wrapper>
      <MainContainer>
        <WelcomeText>Welcome</WelcomeText>
        <FormContainer>
          <StyledInput
            required
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <StyledInput
            required
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </FormContainer>
        <ButtonContainer>
          <StyledButton type="submit" onClick={joinRoom}>
            Join Chat
          </StyledButton>
        </ButtonContainer>
      </MainContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${bg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 55vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 412px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 768px) {
    width: 50vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 40vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 60vh;
  }
`;
const WelcomeText = styled.h2`
  margin: 3rem 0 4rem 0;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  height: 20%;
  width: 100%;
`;
const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 15, 0.37);
  border-radius: 10px;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 16px;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #948cac;
    backdrop-filter: blur(12rem);
    border-radius: 16px;
    outline: none;
  }
  &::placeholder {
    color: #1d1c1e99;
  }
`;

const ButtonContainer = styled.div`
  margin: 54px 0 30px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledButton = styled.button`
  background: #464693;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 70%;
  height: 42px;
  border: none;
  color: #fff;
  border-radius: 10px;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
  cursor: pointer;
  &:hover {
    background: rgba(74, 113, 180, 1);
  }
`;
export default Home;
