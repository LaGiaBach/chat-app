import React from 'react';
import {Row, Col} from "antd" 
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SidebarStyled = styled.div`
    background:#ddd;
    border-right:1px solid #ccc;
    color: #000;
    height:100vh;
`
const Sidebar = () => {
  
  return (
    <SidebarStyled>
        <Row>
            <Col span={24}><UserInfo /></Col>
            <Col span={24}><RoomList/></Col>
        </Row>
    </SidebarStyled>
  )
}

export default Sidebar