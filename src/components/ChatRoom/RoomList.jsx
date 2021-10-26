import React from "react";
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
  return (
    <Collapse ghost defaultCollapse={["1"]}>
      <PanelStyled header="リストルーム" key="1">
        <LinkStyled>Room 1</LinkStyled>
        <LinkStyled>Room 2</LinkStyled>
        <LinkStyled>Room 3</LinkStyled>
        <LinkStyled>Room 4</LinkStyled>
        <LinkStyled>Room 5</LinkStyled>
        <Button type="text" icon={<PlusSquareOutlined />} className="btn__addroom">
          ルーム追加
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
