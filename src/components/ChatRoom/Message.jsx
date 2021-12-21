import React from "react";
import { Avatar, Typography, Tooltip, Badge } from "antd";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { formatRelative } from "date-fns/esm";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .wrap-content {
    overflow: hidden;
  }
  .author {
    margin-left: 5px;
    font-weight: 600;
  }

  .date {
    margin-left: 5px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content,
  .diff-owner-content {
    background: #37373a;
    color: #fff;
    width: fit-content;
    padding: 6px 10px;
    border-radius: 3px;
    margin-right: 10px;
    float: right;
  }

  .diff-owner-content {
    float: none;
    margin-left: 38px;
    background: #a9a9a9;
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
export default function Message({ text, created, uid }) {
  const { currentUser, selectedRoomMembers } = React.useContext(AppContext);
  const author = selectedRoomMembers.filter(x => x.uid === uid)[0];
  return (
    <WrapperStyled>
      {uid === currentUser?.uid ? (
        <div className="wrap-content">
          <Tooltip title={formatDate(created?.seconds)} placement="left">
            <Typography.Text className="content">{text}</Typography.Text>
          </Tooltip>
        </div>
      ) : (
        <>
          <div>
            <Badge status="success" offset={[0, 5]} dot={author?.isOnline ? true : false} showZero>
              <Avatar src={author?.photoURL}>{author?.displayName?.charAt(0)}</Avatar>
            </Badge>
            <Typography.Text className="author">{author?.displayName}</Typography.Text>
            <Typography.Text className="date">{formatDate(created?.seconds)}</Typography.Text>
          </div>
          <div>
            <Typography.Text className="diff-owner-content">{text}</Typography.Text>
          </div>
        </>
      )}
    </WrapperStyled>
  );
}
