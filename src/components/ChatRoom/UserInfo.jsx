import React from "react";
import { auth } from "../../firebase/config";
import { Button, Avatar, Typography, Tooltip } from "antd";
import { useHistory } from "react-router";
import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthProvider";
import { Menu } from "antd";
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: #fff;
    margin-left: 5px;
  }

  .ant-menu {
    background-color: transparent;
    border: none;
    width: 100%;
  }

  i.ant-menu-submenu-arrow::after,
  i.ant-menu-submenu-arrow::before {
    color: #fff;
  }
`;
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1"];

export default function UserInfo() {
  const [openKeys, setOpenKeys] = React.useState([]);
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/login");
  };
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <WrapperStyled>
      <Menu openKeys={openKeys} onOpenChange={onOpenChange} triggerSubMenuAction="click">
        <SubMenu
          key="sub1"
          icon={<Avatar src={photoURL ? photoURL : ""}>{displayName?.charAt(0)}</Avatar>}
          title={<Typography.Text className="username">{displayName ? displayName : ""}</Typography.Text>}
        >
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2" onClick={handleLogout}>
            <LogoutOutlined />
            <span>ログアウト</span>
          </Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
      </Menu>
      <Tooltip placement="leftTop" title="ログアウト"></Tooltip>
    </WrapperStyled>
  );
}
