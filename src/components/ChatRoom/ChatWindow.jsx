import React, { useState } from "react";
import { UserAddOutlined, DashOutlined } from "@ant-design/icons";
import { Tooltip, Avatar, Alert, Menu, Dropdown, Badge, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/service";
import styled from "styled-components";
import Message from "./Message";
import InputEmoji from "react-input-emoji";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--chat-window-header-height);
  padding: 36px 30px;
  border-bottom: 2px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: 600;
    }

    &__description {
      font-size: 16px;
      line-height: 1.2;
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
  height: calc(100% - (var(--title-bar-height) + var(--chat-window-header-height)));
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 12px;
  margin-top: 10px;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(55, 55, 58, 0.8);
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(55, 55, 58, 1);
    cursor: pointer;
  }
`;

export default function ChatWindow() {
  const [text, setText] = useState("");
  const messagesRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const {
    selectedRoom,
    selectedRoomMembers,
    selectedRoomId,
    leaveRoomChat,
    stayRoomChat,
    messages,
    setIsInviteMemberVisible,
    currentUser,
    userAnnounces,
  } = React.useContext(AppContext);

  const handleOnSubmit = value => {
    if (value) {
      addDocument("messages", {
        mess: value,
        uid: currentUser?.uid,
        roomId: selectedRoomId,
        isAnnounce: false,
        membersUid: [],
      });
      // focus to input again after submit
      inputRef?.current.focus();
    }
  };
  const handleAccept = () => {
    stayRoomChat();
  };
  const handleDeny = () => {
    leaveRoomChat();
  };

  function handleMenuClick(e) {
    if (e.key === "1") {
      setIsInviteMemberVisible(true);
    } else if (e.key === "2") {
      leaveRoomChat();
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <UserAddOutlined />
        <span>メンバーを追加</span>
      </Menu.Item>
      <Menu.Item key="2" danger>
        <ExportOutlined />
        <span>チャットを退出</span>
      </Menu.Item>
    </Menu>
  );

  React.useEffect(() => {
    // scroll to bottom affter message changed
    if (messagesRef?.current)
      messagesRef?.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [messages]);

  return (
    <>
      {selectedRoomId !== "" ? (
        <WrapperStyled>
          <HeaderStyled>
            <div className="header__info">
              <h1 className="header__title">{selectedRoom.name}</h1>
              <h3 className="header__description">{selectedRoom.description}</h3>
            </div>
            <ButtonGroupStyled>
              <Avatar.Group size="small" maxCount={2}>
                {selectedRoomMembers.map(member => (
                  <Tooltip key={member?.id} placement="bottomLeft" title={member?.displayName}>
                    <Badge status="success" offset={[-5, 20]} dot={member?.isOnline ? true : false} showZero>
                      <Avatar src={member?.photoURL}>{member.displayName?.charAt(0)}</Avatar>
                    </Badge>
                  </Tooltip>
                ))}
              </Avatar.Group>
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: "6px" }} icon={<DashOutlined />} />
              </Dropdown>
            </ButtonGroupStyled>
          </HeaderStyled>

          {userAnnounces === undefined ? (
            <ContentStyled>
              <MessageListStyled>
                {messages.map(mess => (
                  <Message
                    key={mess.id}
                    created={mess.created}
                    text={mess.mess}
                    uid={mess.uid}
                    isAnnounce={mess.isAnnounce}
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
          ) : (
            <div>
              <Alert
                type="info"
                message="注意"
                description={userAnnounces?.invitedUser + "さんからグループ招待があります。"}
                showIcon
              />
              <Button style={{ margin: "10px" }} className="ant-btn-primary" onClick={handleAccept}>
                参加
              </Button>
              <Button className="ant-btn-danger" onClick={handleDeny}>
                拒否
              </Button>
            </div>
          )}
        </WrapperStyled>
      ) : (
        <Alert
          type="info"
          message="注意"
          description="いずれのルームチャットが選択されていません！"
          showIcon
          closable
        />
      )}
    </>
  );
}
