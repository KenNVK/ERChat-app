import React from "react";
import { auth } from "../../firebase/config";
import { Button, Avatar, Typography } from "antd";
import { useHistory } from "react-router";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: #fff;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/login");
  };
  return (
    <WrapperStyled>
      <div>
        <Avatar>K</Avatar>
        <Typography.Text className="username">NVKHOA</Typography.Text>
      </div>
      <Button ghost danger onClick={handleLogout}>
        <span>ログアウト</span>
      </Button>
    </WrapperStyled>
  );
}
