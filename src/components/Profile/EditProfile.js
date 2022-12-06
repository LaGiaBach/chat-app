import { Button, Form, Input, Row, Upload,message, Avatar } from "antd";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { UploadOutlined } from '@ant-design/icons';
import { AuthContext } from "../../Context/AuthProvider";


const WraperStyled = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  min-width: 500px;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  .container {
    flex-flow: column wrap;

  }
  .ant-col-24 {
    flex: unset;
  }
`;
const Container = styled.div`
  background: #eee;
`;
const ImgSection = styled.div`
  display: flex;
  gap: 0 100px;
  align-items: center;
  .ant-avatar-lg {
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }
  .ant-avatar-string{
    transform: scale(1) translateX(-50%) translateY(-50%) !important;
    top: 50%;
    font-size: 73px;
  }
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditProfile = () => {
  const {users : {
    photoURL,
    displayName,
    email
  }} = useContext(AuthContext)

  const [newName,setNewName]=useState(displayName)
  const [newEmail,setNewEmail]=useState(email)
  const [previewImage, setPreviewImage] = useState(photoURL);
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const urlPreview = await getBase64(info.file.originFileObj)
        setPreviewImage(urlPreview)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    async onPreview(file){
      console.log(file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
    }
  };

  // const handlePreview = (e) => {
  //   console.log(e)
  //   setPreviewImage(e.file.originFileObj.name)
  // }
  const inputRef = useRef()
  const handleInput = (e) =>{
    const type = inputRef?.current?.input?.dataset?.type
    if(type === "email"){
      setNewEmail(e.target.value)
      console.log(e.target.value)
    }
    else if(type === "name"){
      setNewName(e.target.value)
      console.log(e.target.value)
    }
  }
  return (
    <Container>
      <WraperStyled>
          <Row className="container">
            <Form layout="vertical">
              <Form.Item>
                <ImgSection>
                <Avatar src={previewImage} size="large">{previewImage ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined/>}>Change</Button>
                  </Upload>
                </ImgSection>
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="Enter email" value={newEmail} onChange={handleInput} data-type="email" ref={inputRef}/>
              </Form.Item>
              <Form.Item label="Display Name">
                <Input placeholder="Enter display name" value={newName} onChange={handleInput} data-type="name" ref={inputRef}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </Row>
        
      </WraperStyled>
    </Container>
  );
};

export default EditProfile;
