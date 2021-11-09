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
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
}
export default function Message({ text, displayName, createdAt, photoURL, userId }) {
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  return (
    <WrapperStyled>
      {userId === uid ? (
        <div style={{ overflow: "auto" }}>
          <Tooltip title={formatDate(1636333650)} placement="topLeft">
            <Typography.Text
              style={{ float: "right", background: "#71e267", borderRadius: "10px" }}
              className="content"
            >
              <Typography.Text className="date">{createdAt}</Typography.Text>
              {text}
            </Typography.Text>
          </Tooltip>
        </div>
      ) : (
        <>
          <div>
            <Avatar src={photoURL}>{displayName?.charAt(0)}</Avatar>
            <Typography.Text className="author">{displayName}</Typography.Text>
            <Typography.Text className="date">{new Date(createdAt).toDateString()}</Typography.Text>
          </div>
          <div>
            <Typography.Text className="content">{text}</Typography.Text>
          </div>
        </>
      )}
    </WrapperStyled>
  );
}
