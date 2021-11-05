import React from "react";
import { auth } from "../../firebase/config";
import { Button, Avatar, Typography, Tooltip } from "antd";
import { useHistory } from "react-router";
import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthProvider";
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
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL ? photoURL : ""}>{displayName?.charAt(0)}</Avatar>
        <Typography.Text className="username">{displayName ? displayName : ""}</Typography.Text>
      </div>
      <Tooltip placement="leftTop" title="ログアウト">
        <Button shape="circle" ghost danger onClick={handleLogout}>
          <span>
            <LogoutOutlined />
          </span>
        </Button>
      </Tooltip>
    </WrapperStyled>
  );
}
