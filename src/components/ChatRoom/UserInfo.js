import { Avatar, Button, Typography } from 'antd'
import React, { useContext } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import {AuthContext} from "../../Context/AuthProvider"

const WraperStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 16px;
    border-bottom: 1px solid #ccc;
    cursor:pointer;
    .username{
         color:#000;
         padding-left:10px
    }
    .user-info:hover .username{
      font-weight:bold
    }
`

const UserInfo = () => {

  
  const {users : {
    displayName,
    photoURL
  },setEditProfile} = useContext(AuthContext)
  // console.log(data)
  const handleEditProfile = () => {
    setEditProfile(true)
  }
  return (
    <WraperStyled >
        
            <div onClick={handleEditProfile} className="user-info">
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button onClick={() => auth.signOut()}>Sign out</Button>
        
    </WraperStyled>
  )
}

export default UserInfo