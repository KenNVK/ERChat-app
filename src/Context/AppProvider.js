import React, { useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const selectedRoom = React.useMemo(
    () => rooms.find(room => room.id === selectedRoomId) || {},
    [selectedRoomId, rooms],
  );

  const messagesCondition = React.useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoomId,
    };
  }, [selectedRoomId]);
  const messages = useFirestore("messages", messagesCondition);
  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);
  const selectedRoomMembers = useFirestore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoom,
        selectedRoomMembers,
        messages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
