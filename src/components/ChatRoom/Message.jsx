import React from "react";
import { Avatar, Typography, Tooltip } from "antd";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import { formatRelative } from "date-fns/esm";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: 600;
  }

  .date {
    margin-left: 5px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    background: White;
    width: fit-content;
    padding: 10px;
    margin-left: 30px;
  }
`;
function formatDate(seconds) {
  let formattedDate = "";
  console.log(seconds?.createdAt);
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
}
export default function Message({ mess, createdAt }) {
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  //formatDate(mess);
  return (
    <WrapperStyled>
      {mess.userId === uid ? (
        <div style={{ overflow: "auto" }}>
          <Tooltip title={formatDate(createdAt?.seconds)} placement="topLeft">
            <Typography.Text
              style={{ float: "right", background: "#71e267", borderRadius: "10px" }}
              className="content"
            >
              {formatDate(mess.createdAt)}
              {mess.mess}
            </Typography.Text>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title={formatDate(mess.createdAt?.seconds)} placement="leftTop">
          <div>
            <Avatar src={mess.photoURL}>{mess.displayName?.charAt(0)}</Avatar>
            <Typography.Text className="author">{mess.displayName}</Typography.Text>
            <Typography.Text className="date">{mess.createdAt}</Typography.Text>
          </div>

          <div>
            <Typography.Text className="content">{mess.text}</Typography.Text>
          </div>
        </Tooltip>
      )}
    </WrapperStyled>
  );
}
