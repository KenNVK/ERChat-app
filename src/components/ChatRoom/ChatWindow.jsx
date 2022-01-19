import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
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
        <span>メンバーを追加する</span>
      </Menu.Item>
      <Menu.Item key="2" danger>
        <ExportOutlined />
        <span>チャットを退出</span>
      </Menu.Item>
    </Menu>
  );

  React.useEffect(() => {
    // scroll to bottom affter message changed
    if (messagesRef?.current) messagesRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {selectedRoomId !== "" ? (
        <WrapperStyled>
          <HeaderStyled>
            <div className="header__info">
              <p className="title">{selectedRoom.name}</p>
              <span className="header__description">{selectedRoom.description}</span>
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
              <Dropdown.Button overlay={menu} />
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
            <>
              <Alert
                type="info"
                message="注意"
                description={userAnnounces?.invitedUser + "さんからグループ招待があります。"}
                showIcon
              />
              <Button className="ant-btn-success" onClick={handleAccept}>
                参加
              </Button>
              <Button className="ant-btn-danger" onClick={handleDeny}>
                拒否
              </Button>
            </>
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
