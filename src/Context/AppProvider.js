import React, { useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { generateKeywords } from "../firebase/service";

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isModifyUserVisible, setIsModifyUserVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const {
    user: { uid, isOnline },
    isSettedStatus,
    setIsSettedStatus,
  } = React.useContext(AuthContext);

  const currentUserCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "==",
      compareValue: uid,
    };
  }, [uid]);
  const currentUser = useFirestore("users", currentUserCondition)[0] || {
    displayName: "",
    photoURL: "",
    uid: "",
  };
  const setStatusUser = status => {
    const userRef = doc(db, "users", currentUser?.id);
    updateDoc(userRef, { isOnline: status });
  };
  while (!isSettedStatus) {
    if (currentUser?.uid === uid && isOnline) {
      setStatusUser(true);
      setIsSettedStatus(true);
      break;
    } else {
      break;
    }
  }

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
  const changeNameCurrentUser = name => {
    const userRef = doc(db, "users", currentUser.id);
    updateDoc(userRef, {
      displayName: name,
      keywords: generateKeywords(name.toLowerCase()),
    });
    setIsModifyUserVisible(false);
  };
  const leaveRoomChat = () => {
    const memRef = doc(db, "rooms", selectedRoomId);
    updateDoc(memRef, { members: selectedRoom?.members.filter(x => x !== currentUser?.uid) });
    setSelectedRoomId("");
  };
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
        isModifyUserVisible,
        setIsModifyUserVisible,
        selectedRoom,
        selectedRoomMembers,
        messages,
        currentUser,
        setStatusUser,
        changeNameCurrentUser,
        leaveRoomChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
