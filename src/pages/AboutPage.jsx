import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const AboutPageContainer = styled.div`
  padding: 0 20px;
`;

const Content = styled.div`
  line-height: 1.6;
  padding-top: 20px;
`;

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <AboutPageContainer>
      <PageHeader
        title="关于"
        left={<HeaderButton onClick={() => navigate('/')}>‹</HeaderButton>}
      />
      <Content>
        <p>这是一个演示应用程序，用于展示类似 Google Authenticator 的界面和功能。</p>
        <p>所有数据都存储在您的浏览器本地。</p>
        <p>使用 React、Styled-components 和 React Router 创建。</p>
      </Content>
    </AboutPageContainer>
  );
};

export default AboutPage;