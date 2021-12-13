import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Row, Col, Typography, Image } from "antd";
import bgImage from "../../images/Background.png";
import logoImage from "../../images/logoER.png";
import { GoogleCircleFilled, FacebookFilled } from "@ant-design/icons";
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { addDocument, generateKeywords } from "../../firebase/service";
import { AppContext } from "../../Context/AppProvider";
import styled from "styled-components";

const LoginContainer = styled.div`
  user-select: none;
  --webkit-user-select: none;
  .login {
    &__background {
      background: url(${bgImage}) no-repeat center center fixed;
      background-size: cover;
      height: 100vh;
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__title {
        display: block;
        margin: 30px 50px;
        color: #333;
      }

      .google-btn,
      .facebook-btn {
        display: flex;
        align-items: center;
        min-width: 240px;
        width: 65%;
        background: linear-gradient(to right, #e66465, #9198e5);
        border: none;

        &__content {
          display: flex;
          align-items: center;
          flex: 1;
        }

        &__icon {
          background: conic-gradient(
              from -45deg,
              #ea4335 110deg,
              #4285f4 90deg 180deg,
              #34a853 180deg 270deg,
              #fbbc05 270deg
            )
            73% 55%/150% 150% no-repeat;
          border-radius: 50%;
          font-size: 1.6rem;
          margin: 0 0.8rem;
        }
        &__text {
          flex: 1;
        }
      }
      .facebook-btn {
        background: linear-gradient(to right, #1672c7, rgb(64 106 159 / 63%));
        margin-top: 12px;

        &__icon {
          background: none;
          fontsize: 1.6rem;
          margin: 0 0.8rem;
        }
      }
    }
  }
`;
const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [loadings, setLoadings] = useState([]);
  const { setSelectedRoomId } = React.useContext(AppContext);
  const handleLogin = async provider => {
    try {
      const data = await signInWithPopup(auth, provider);
      setSelectedRoomId("");
      if (data._tokenResponse?.isNewUser) {
        addDocument("users", {
          displayName: data.user.displayName,
          email: data.user.email,
          uid: data.user.uid,
          photoURL: data.user.photoURL,
          providerId: data.providerId,
          keywords: generateKeywords(data.user.displayName.toLowerCase()),
        });
      }
    } catch (error) {
      setLoadings([]);
      const errorMessage = error.message;
      return errorMessage;
    }
  };

  const enterLoading = index => {
    loadings[index] = true;
    setLoadings([...loadings]);
  };

  return (
    <LoginContainer>
      <Row>
        <Col span={14} className="login__background"></Col>
        <Col span={10} className="login__content">
          <img className="login__content__logo" width={100} src={logoImage} alt="logo" />
          <Title className="login__content__title">Sign in</Title>
          <Button
            className="google-btn"
            size="large"
            type="primary"
            loading={loadings[0]}
            onClick={() => {
              handleLogin(googleProvider);
              enterLoading(0);
            }}
          >
            <div className="google-btn__content">
              <GoogleCircleFilled className="google-btn__icon" />
              <span className="google-btn__text">Googleでログイン</span>
            </div>
          </Button>

          <Button
            className="facebook-btn"
            size="large"
            type="primary"
            loading={loadings[1]}
            onClick={() => {
              handleLogin(fbProvider);
              enterLoading(1);
            }}
          >
            <div className="facebook-btn__content">
              <FacebookFilled className="facebook-btn__icon" />
              <span className="facebook-btn__text">Facebookでログイン</span>
            </div>
          </Button>
        </Col>
      </Row>
    </LoginContainer>
  );
}
