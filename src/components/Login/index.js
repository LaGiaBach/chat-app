import React from "react";
import { Row, Col, Typography, Button } from "antd";
import firebase, {auth} from "../../firebase/config"
import { addDocument, generateKeywords } from "../../firebase/services";


const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider()

const Login = () => {
    const handleFbLogin = async () => {
       const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider)
       if(additionalUserInfo?.isNewUser){
          addDocument('users' , {
            displayName: user.displayName,
            email: user.email,
            photoURL:user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName)
          })
       }
    };
    

  return (
    <>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            {" "}
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>Login with Facebook</Button>
        </Col>
      </Row>
    </>
  );
};

export default Login;
