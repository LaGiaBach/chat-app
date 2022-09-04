import { Avatar, Button, Typography } from 'antd'
import React, { useContext } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import {AuthContext} from "../../Context/AuthProvider"


const WraperStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 16px;
    border-bottom: 1px solid rgba(82,38,83);
    .username{
         color:#fff;
         padding-left:10px
    }
`

const UserInfo = () => {

  
  const {users : {
    displayName,
    photoURL
  }} = useContext(AuthContext)
  // console.log(data)

  return (
    <WraperStyled>
        
            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Sign out</Button>
        
    </WraperStyled>
  )
}

export default UserInfo