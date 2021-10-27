import React from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Tooltip, Avatar, Button, Input, Form } from "antd";
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
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="title">Room1 </p>
          <span className="header__description">This is room1</span>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text">
            招待
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip>
              <Avatar title="A"></Avatar>
            </Tooltip>
            <Tooltip>
              <Avatar title="B"></Avatar>
            </Tooltip>
            <Tooltip>
              <Avatar title="C"></Avatar>
            </Tooltip>
            <Tooltip>
              <Avatar title="D"></Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message text="Test" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test1" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test12" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test123" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test1" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test12" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
          <Message text="Test123" photoURL={null} displayName="Khoa" createdAt={2021}></Message>
        </MessageListStyled>

        <FormStyled>
          <Form.Item>
            <Input borderd={false} autoComplete="off" placeholder="メッセージを入力" />
          </Form.Item>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
