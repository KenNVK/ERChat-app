import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Tooltip, Avatar, Button, Alert } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/service";
import styled from "styled-components";
import Message from "./Message";
import InputEmoji from "react-input-emoji";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__infor {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: 600;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 11px;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const [text, setText] = useState("");
  const messagesRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const { selectedRoom, selectedRoomMembers, selectedRoomId, messages, setIsInviteMemberVisible } =
    React.useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = React.useContext(AuthContext);

  const handleOnSubmit = value => {
    if (value) {
      addDocument("messages", { ...{ mess: value }, userId: uid, displayName, photoURL, roomId: selectedRoomId });
      // focus to input again after submit
      inputRef?.current.focus();
    }
  };

  React.useEffect(() => {
    // scroll to bottom affter message changed
    if (messagesRef?.current) messagesRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (selectedRoomId !== "") {
    return (
      <WrapperStyled>
        <HeaderStyled>
          <div className="header__info">
            <p className="title">{selectedRoom.name}</p>
            <span className="header__description">{selectedRoom.description}</span>
          </div>
          <ButtonGroupStyled>
            <Button icon={<UserAddOutlined />} onClick={() => setIsInviteMemberVisible(true)} type="text">
              招待
            </Button>
            <Avatar.Group size="small" maxCount={2}>
              {selectedRoomMembers.map(member => (
                <Tooltip key={member?.id} placement="bottomLeft" title={member?.displayName}>
                  <Avatar src={member?.photoURL}>{member.displayName?.charAt(0)}</Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </ButtonGroupStyled>
        </HeaderStyled>
        <ContentStyled>
          <MessageListStyled>
            {messages.map(mess => (
              <Message
                key={mess.id}
                created={mess.created}
                text={mess.mess}
                photoURL={mess.photoURL}
                displayName={mess.displayName}
                userId={mess.userId}
              ></Message>
            ))}
            <div style={{ float: "left", clear: "both" }} ref={messagesRef}></div>
          </MessageListStyled>

          <InputEmoji
            onEnter={handleOnSubmit}
            value={text}
            onChange={setText}
            cleanOnEnter
            placeholder="メッセージを入力"
            ref={inputRef}
            borderColor="#bbb"
            borderRadius="14px"
          />
        </ContentStyled>
      </WrapperStyled>
    );
  } else {
    return (
      <>
        <Alert
          type="info"
          message="注意"
          description="いずれのルームチャットが選択されていません！"
          showIcon
          closable
        />
      </>
    );
  }
}
