import React, { createContext, useMemo, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFileStore from "../hooks/useFileStore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const {
    users: { uid },
  } = useContext(AuthContext);
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFileStore("rooms", roomsCondition);

  const selectRoom = useMemo(() => 
    rooms.find((room) => room.id === selectedRoomId) || {},[rooms,selectedRoomId])
  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectRoom?.members,
    };
  }, [selectRoom?.members]);
  

 
  const members = useFileStore("users", usersCondition);
  console.log(members)

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectRoom,
        members,
        isInviteMemberVisible, 
        setIsInviteMemberVisible
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
