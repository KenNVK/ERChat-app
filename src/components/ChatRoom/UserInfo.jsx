import React from "react";
import { auth } from "../../firebase/config";
import { Avatar, Typography, Tooltip } from "antd";
import { useHistory } from "react-router";
import styled from "styled-components";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { Menu } from "antd";
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e8e8e8;

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
  const { user } = React.useContext(AuthContext);
  const { setIsModifyUserVisible, currentUser, setStatusUser } = React.useContext(AppContext);
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/login");
    user.isOnline = false;
    setStatusUser(false);
  };
  const { displayName, photoURL } = currentUser;

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
          title={
            <Tooltip placement="bottomLeft" title={displayName ? displayName : ""}>
              <Typography.Text className="username">{displayName ? displayName : ""}</Typography.Text>
            </Tooltip>
          }
        >
          <Menu.Item key="1" onClick={() => setIsModifyUserVisible(true)}>
            <SettingOutlined />
            <span>情報変更</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={handleLogout}>
            <LogoutOutlined />
            <span>ログアウト</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
      <Tooltip placement="leftTop" title="ログアウト"></Tooltip>
    </WrapperStyled>
  );
}
