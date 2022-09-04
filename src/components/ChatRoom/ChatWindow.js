import { UserAddOutlined } from "@ant-design/icons";
import { Button, Avatar, Tooltip, Form, Input, Alert } from "antd";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import Message from "./Message";
import {addDocument} from "../../firebase/services"
import { AuthContext } from "../../Context/AuthProvider";
import useFileStore from "../../hooks/useFileStore";
import { useMemo } from "react";
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const WraperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectRoom, members, setIsInviteMemberVisible, selectedRoomId } =
    useContext(AppContext);
    const {users:{ 
      uid,
      photoURL,
      displayName
     }} = useContext(AuthContext)
    const [inputValue,setInputValue] = useState('')
    const[form] = Form.useForm()

    const handleInputChange = (e) =>{
      setInputValue(e.target.value);
    }
    const handleSubmit = () =>{
      addDocument('messages', { 
        text: inputValue, 
        uid,
        photoURL,
        roomId:selectRoom.id,
        displayName,
      })
      form.resetFields(['messages'])
    }
    const condition = useMemo(()=>({
      fieldName:"roomId",
      operator:"==",
      compareValue: selectRoom.id
    }),[selectRoom])
    const messages = useFileStore('messages' , condition)
    console.log(messages)
  return (
    <WraperStyled>
      {selectedRoomId ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectRoom?.name}</p>
              <span className="header__description">
                {selectRoom?.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
            {messages.map((message) => 
            <Message
              key={message.id}
              text={message.text}
              photoURL={message.photoURL}
              displayName={message.displayName}
              createdAt={message.createdAt}
            />)}
             
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="messages">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleSubmit}
                  placeholder="Enter your message"
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit}>Send</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Select a room chat"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WraperStyled>
  );
};

export default ChatWindow;
