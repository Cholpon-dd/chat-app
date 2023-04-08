import React, { useEffect, useRef, useState } from 'react';
import RoomAndUsers from './RoomAndUsers';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';
import EmojiPicker from 'emoji-picker-react';
import bgChat from '../../assets/556853.jpg';

const Chat = ({ socket, info }) => {
  const [messages, setMessages] = useState('');
  const [sendMsg, setSendMsg] = useState('');
  const [isOpen, setOpen] = useState(false);
  const lastMessageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sendMsg) {
      socket.emit('send', sendMsg);
    }
    setSendMsg('');
  };
  const onEmojiClick = ({ emoji }) => setSendMsg(`${sendMsg} ${emoji}`);

  useEffect(() => {
    socket.on('info', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollTo(0, 99999);
  }, [messages]);

  return (
    <WrapperChatPage>
      <ParrentContainer>
        <RoomAndUsers socket={socket} />
        <Container>
          <ChatWrapper>
            <ChatHeader>Chat</ChatHeader>
            <ChatBody ref={lastMessageRef}>
              {messages &&
                messages.map((msg, idx) => (
                  <MessagesContainer key={idx} id={info === msg.userName ? 'my' : 'other'}>
                    <MessageTop>
                      <MessageUserName>{msg.userName}</MessageUserName>
                      <MessageDate>{msg.time}</MessageDate>
                    </MessageTop>
                    <MessageText id={info === msg.userName ? 'my' : 'other'}>
                      {msg.text}
                    </MessageText>
                  </MessagesContainer>
                ))}
            </ChatBody>
            <ChatFooter>
              <ChatForm onSubmit={handleSubmit}>
                <ChatInput
                  type="text"
                  placeholder="Print text..."
                  value={sendMsg}
                  onChange={(e) => setSendMsg(e.target.value)}
                />
                <div>
                  <EmojiButton onClick={() => setOpen(!isOpen)}>😊</EmojiButton>
                  {isOpen && <EmojiPicker onEmojiClick={onEmojiClick} />}
                </div>
                <SendButton type="submit">
                  <AiOutlineSend size={25} style={{ cursor: 'pointer', color: '#2d2d64' }} />
                </SendButton>
              </ChatForm>
            </ChatFooter>
          </ChatWrapper>
        </Container>
      </ParrentContainer>
    </WrapperChatPage>
  );
};

const WrapperChatPage = styled.div`
  background-image: url(${bgChat});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const ParrentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const ChatWrapper = styled.div`
  width: 700px;
  height: 600px;
  border-radius: 10px 10px 10px 0;
  background: #fff;
  position: relative;
  @media only screen and (max-width: 320px) {
    width: 250px;
    height: 350px;
  }
  @media only screen and (min-width: 340px) {
    width: 250px;
    height: 350px;
  }
  @media only screen and (min-width: 360px) {
    width: 300px;
    height: 350px;
  }
  @media only screen and (min-width: 412px) {
    width: 350px;
    height: 400px;
  }
  @media only screen and (min-width: 600px) {
    width: 400px;
    height: 500px;
  }
  @media only screen and (min-width: 720px) {
    width: 400px;
    height: 600px;
  }
  @media only screen and (min-width: 738px) {
    width: 450px;
    height: 600px;
  }
  @media only screen and (min-width: 768px) {
    width: 500px;
    height: 600px;
  }

  @media only screen and (min-width: 1024px) {
    width: 700px;
    height: 600px;
  }
  @media only screen and (min-width: 1280px) {
    width: 700px;
    height: 600px;
  }
`;
const ChatHeader = styled.div`
  background: #464693;
  border-radius: 0 10px 0 0;
  height: 40px;
  text-align: center;
  padding: 6px;
  color: #fff;
  font-size: 20px;
  letter-spacing: 2px;
`;
const ChatBody = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #9292b8;
    height: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #337ab7;
    max-height: 8px;
  }
`;

const ChatFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
`;
const ChatForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-top: 2px solid #464693;
`;
const ChatInput = styled.input`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 12px;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 16px;
  font-weight: bold;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #807f8299;
  }
`;
const MessagesContainer = styled.div`
  margin: 5px;
  border-radius: 5px;
  width: 70%;
  align-self: ${({ id }) => (id === 'my' ? 'flex-end' : 'flex-start')};
  color: #fff;
`;
const MessageTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 200px;
  @media only screen and (max-width: 320px) {
    gap: 10px;
  }
  @media only screen and (min-width: 340px) {
    gap: 20px;
  }
  @media only screen and (min-width: 360px) {
    gap: 30px;
  }
  @media only screen and (min-width: 412px) {
    gap: 45;
  }
  @media only screen and (min-width: 600px) {
    gap: 65;
  }
  @media only screen and (min-width: 768px) {
    gap: 130px;
  }
  @media only screen and (min-width: 1024px) {
    gap: 200px;
  }
  @media only screen and (min-width: 1280px) {
    gap: 200px;
  }
`;
const MessageUserName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #29295b;
  text-transform: capitalize;
`;
const MessageDate = styled.span`
  font-size: 12px;
  color: #29295b; ;
`;
const MessageText = styled.div`
  padding: 15px;
  border-radius: 0 10px 10px 10px;
  word-wrap: break-word;
  width: 80%;
  background-color: ${({ id }) => (id === 'my' ? '#337ab7' : '#98b5d1')};
  align-self: ${({ id }) => (id === 'my' ? 'flex-end' : 'flex-start')};
`;
const EmojiButton = styled.button`
  font-size: 21px;
  background: transparent;
  border: none;
  margin-bottom: 5px;
  margin-right: 10px;
  cursor: pointer;
`;
const SendButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export default Chat;
