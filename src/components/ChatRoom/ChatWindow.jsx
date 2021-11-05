import React from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Tooltip, Avatar, Button, Input, Form, Alert } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/service";
import styled from "styled-components";
import Message from "./Message";

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

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const { selectedRoom, selectedRoomMembers, selectedRoomId, messages } = React.useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = React.useContext(AuthContext);
  const [form] = Form.useForm();
  const subMess = value => {
    addDocument("messages", { ...form.getFieldsValue(), userId: uid, displayName, photoURL, roomId: selectedRoomId });
    form.resetFields();
  };
  if (selectedRoomId !== "") {
    return (
      <WrapperStyled>
        <HeaderStyled>
          <div className="header__info">
            <p className="title">{selectedRoom.name}</p>
            <span className="header__description">{selectedRoom.description}</span>
          </div>
          <ButtonGroupStyled>
            <Button icon={<UserAddOutlined />} type="text">
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
              <Message mess={mess}></Message>
            ))}
          </MessageListStyled>

          <FormStyled form={form} onFinish={subMess}>
            <Form.Item name="mess">
              <Input bordered={false} autoComplete="off" placeholder="メッセージを入力" />
            </Form.Item>
          </FormStyled>
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
