import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Row, Col, Typography } from "antd";
import bgImage from "../../images/Background.png";
import { GoogleCircleFilled, FacebookFilled } from "@ant-design/icons";
import firebase, { auth } from "../../firebase/config";
import { addDocument } from "../../firebase/service";
import { AppContext } from "../../Context/AppProvider";

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const [loadings, setLoadings] = useState([]);
  const { setSelectedRoomId } = React.useContext(AppContext);
  const handleLogin = async provider => {
    try {
      const data = await auth.signInWithPopup(provider);
      setSelectedRoomId("");
      if (data.additionalUserInfo?.isNewUser) {
        addDocument("users", {
          displayName: data.user.displayName,
          email: data.user.email,
          uid: data.user.uid,
          photoURL: data.user.photoURL,
          providerId: data.additionalUserInfo.providerId,
        });
      }
    } catch (error) {
      console.log(error);
      setLoadings([]);
    }
  };

  const enterLoading = index => {
    loadings[index] = true;
    setLoadings([...loadings]);
  };

  return (
    <>
      <Row>
        <Col
          span={14}
          style={{
            background: `url("${bgImage}") no-repeat center center fixed`,
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
          }}
        ></Col>
        <Col
          span={10}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "120px 0 200px",
          }}
        >
          <Title style={{ marginBottom: "50px", color: "#333" }}>Sign in</Title>
          <Button
            style={{
              minWidth: "240px",
              width: "65%",
              display: "flex",
              alignItems: "center",
              background: "linear-gradient(to right, #e66465, #9198e5)",
              border: "none",
            }}
            size="large"
            type="primary"
            loading={loadings[0]}
            onClick={() => {
              handleLogin(googleProvider);
              enterLoading(0);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
              <GoogleCircleFilled
                style={{
                  background:
                    "conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat",
                  borderRadius: "50%",
                  fontSize: "1.6rem",
                  margin: "0 .8rem",
                }}
              />
              <span style={{ flex: "1" }}>Googleでログイン</span>
            </div>
          </Button>

          <Button
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "240px",
              width: "65%",
              marginTop: "12px",
              background: "linear-gradient(to right, #1672c7, rgb(64 106 159 / 63%))",
              border: "none",
            }}
            size="large"
            type="primary"
            loading={loadings[1]}
            onClick={() => {
              handleLogin(fbProvider);
              enterLoading(1);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
              <FacebookFilled style={{ fontSize: "1.6rem", margin: "0 .8rem" }} />
              <span style={{ flex: "1" }}>Facebookでログイン</span>
            </div>
          </Button>
        </Col>
      </Row>
    </>
  );
}
