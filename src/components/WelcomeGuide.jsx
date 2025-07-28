import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.theme.primary};
  color: white;
  cursor: pointer;
`;

const WelcomeGuide = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>欢迎!ACELY大佬 && 阳哥</h2>
        <p>此项目是根据群里的要求完成的。</p>
        <p>展示了一个功能齐全的身份验证器应用，包括账户管理、主题定制和密码保护。</p>
         <p>项目是纯前端的,使用docker部署在阿里云服务器</p>
        <CloseButton onClick={onClose}>开始使用</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default WelcomeGuide;