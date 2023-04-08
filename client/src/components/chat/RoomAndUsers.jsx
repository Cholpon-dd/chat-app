import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ImUsers } from 'react-icons/im';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const RoomAndUsers = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [left, setLeft] = useState('');

  useEffect(() => {
    // fetch('https://chat-app-server-alpha.vercel.app/api/users')
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        const { users, rooms } = data;
      });

    socket.on('users', ({ users, rooms }) => {
      setUsers(users);
      setRooms(rooms);
    });
    socket.on('leave', (data) => {
      setLeft(data.text);
    });
    socket.on('info', (data) => {
      setLeft(data.text);
    });
  }, []);

  const handleLeave = () => {
    socket.emit('leave');
  };
  return (
    <SideBar>
      <Link to="/">
        {' '}
        <ChatHeader>Room</ChatHeader>
      </Link>
      <SideBarBody>
        <UserContainer>
          <HiChatBubbleLeftRight color="#fff" size={20} style={{ marginBottom: '-1px' }} />
          <UserName>Chat Room:</UserName>
        </UserContainer>
        <UserList>
          {rooms.map((room) => (
            <li key={room}> {room}</li>
          ))}
        </UserList>
        <UserContainer>
          <ImUsers color="#fff" size={20} style={{ marginBottom: '-1px' }} />
          <UserName>Users:</UserName>

          <UserList>
            {users.map((user) => (
              <li key={user.id}>{user.userName}</li>
            ))}
          </UserList>
        </UserContainer>
        <ButtonContainer onClick={handleLeave}>Leave</ButtonContainer>
      </SideBarBody>
    </SideBar>
  );
};

const SideBar = styled.div`
  width: 200px;
  height: 600px;
  border-right: 1px solid grey;
  border-radius: 10px 0 0 10px;
  position: relative;
  backdrop-filter: blur(8.5px);
  background: rgba(255, 255, 255, 0.2);

  @media only screen and (min-width: 320px) {
    display: none;
  }
  @media only screen and (min-width: 340px) {
    display: none;
  }
  @media only screen and (min-width: 360px) {
    width: 100px;
    height: 350px;
    display: block;
  }
  @media only screen and (min-width: 412px) {
    width: 100px;
    height: 400px;
    display: block;
  }
  @media only screen and (min-width: 600px) {
    width: 150px;
    height: 500px;
    display: block;
  }
  @media only screen and (min-width: 720px) {
    width: 200px;
    height: 600px;
    display: block;
  }
  @media only screen and (min-width: 738px) {
    width: 200px;
    height: 600px;
    display: block;
  }
  @media only screen and (min-width: 768px) {
    width: 200px;
    height: 600px;
    display: block;
  }
  @media only screen and (min-width: 1280px) {
    width: 200px;
    height: 600px;
  }
`;
const ChatHeader = styled.div`
  background: #464693;
  border-radius: 10px 0 0 0;
  height: 40px;
  text-align: center;
  padding: 6px;
  color: #fff;
  font-size: 20px;
  letter-spacing: 2px;
`;

const SideBarBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const UserContainer = styled.div`
  margin-top: 10px;
`;
const UserName = styled.span`
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
`;
const UserList = styled.ul`
  font-size: 18px;
  color: #29295b;
  text-align: center;
  padding-top: 10px;
  text-transform: capitalize;
`;
const ButtonContainer = styled.button`
  position: absolute;
  bottom: 6px;
  width: 160px;
  padding: 8px;
  border-radius: 10px;
  background: #464693;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  &:hover {
    background: #337ab7;
  }
  @media only screen and (min-width: 200px) {
    display: none;
  }
  @media only screen and (min-width: 320px) {
    display: none;
  }
  @media only screen and (min-width: 340px) {
    display: none;
  }
  @media only screen and (min-width: 360px) {
    width: 50px;

    display: block;
  }
  @media only screen and (min-width: 412px) {
    width: 80px;

    display: block;
  }
  @media only screen and (min-width: 600px) {
    width: 90px;

    display: block;
  }
  @media only screen and (min-width: 720px) {
    width: 100px;

    display: block;
  }
  @media only screen and (min-width: 738px) {
    width: 100px;

    display: block;
  }
  @media only screen and (min-width: 768px) {
    width: 120px;

    display: block;
  }
  @media only screen and (min-width: 1280px) {
    width: 160px;
  }
`;
export default RoomAndUsers;
