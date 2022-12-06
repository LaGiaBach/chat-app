import React, { useContext, useState, useEffect } from "react";
import { Avatar, Button, Collapse, Input, Tooltip, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";
// import { GetDocument } from "../../firebase/services";
import { AuthContext } from '../../Context/AuthProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #000;
    }
    .ant-collapse-content-box {
        padding:0
    }
  }
`;
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: #000 !important;
  margin-left: 10px;
  font-weight: bold;
`;
const RoomListWrapper = styled.div`
  display: flex;
  cursor: pointer;
  height: 60px;
  align-items: center;
  padding-left: 16px;
  &&&:hover{
    background:#ccc
  }
`;
const AddRoomBtn = styled(Button)`
  color: #000;
  background: none;
  padding: 0;
  &&& {
    span:last-child{
      display:none
    }
  }
`;
const RoomSearch = styled.div`
  flex: 1;
  margin-right:20px
`;
const RoomSearchWrapper = styled.div`
  display: flex;
  padding: 5px 16px;
  justify-content:space-between
`
const RoomList = () => {
  const {setEditProfile} = useContext(AuthContext)
  const { rooms, setIsAddRoomVisible, setSelectedRoomId ,selectedRoomId } =
    useContext(AppContext);

  const [roomList, setRoomList] = useState(rooms);
  const [searchRoomTerm, setSearchRoomTerm] = useState("");

  useEffect(() => {
    const fillteredRoom = rooms.filter((room) =>
      room.name.toLowerCase().includes(searchRoomTerm.toLowerCase())
    );
    setRoomList(fillteredRoom);
  }, [rooms, searchRoomTerm]);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
    <RoomSearchWrapper>
      <RoomSearch>
            <Input
              placeholder="Search Room"
              onChange={(e) => setSearchRoomTerm(e.target.value)}
            />
          </RoomSearch>
        <AddRoomBtn
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Add room chat
        </AddRoomBtn>
    </RoomSearchWrapper>
      <PanelStyled  header="Room List Available" key="1">
        {roomList?.map((room) => (
          <RoomListWrapper  key={room.id} style={{background: selectedRoomId === room.id ? "#ccc" : ''}}  onClick={() => {
            setSelectedRoomId(room.id)
            setEditProfile(false)
            }}>
            <Avatar.Group size="small" maxCount={1}>
              {room?.membersAvatar?.map((avatar) => (
                <Tooltip key={avatar}>
                  <Avatar src={avatar}/>
                </Tooltip>
              ))}
            </Avatar.Group>
            <LinkStyled
              key={room.id}
              
            >
              {room.name}
            </LinkStyled>
          </RoomListWrapper>
        ))}
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;
