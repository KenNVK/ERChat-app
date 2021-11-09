import React from "react";
import { AppContext } from "../../Context/AppProvider";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .btn__addroom {
      color: #fff;
      paddding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: #fff;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  return (
    <Collapse ghost defaultCollapse={["1"]}>
      <PanelStyled header="リストルーム" key="1">
        {rooms.map(room => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button type="text" onClick={handleAddRoom} icon={<PlusSquareOutlined />} className="btn__addroom">
          ルーム追加
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
