import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => props.theme.body};
  min-height: 30px;
  margin-bottom: 20px;
`;

const HeaderSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LeftSection = styled(HeaderSection)`
  justify-content: flex-start;
`;

const CenterSection = styled(HeaderSection)`
  justify-content: center;
  text-align: center;
`;

const RightSection = styled(HeaderSection)`
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.text};
`;

export const HeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.primary};
  padding: 0;
  line-height: 1;
`;

export const HeaderLink = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  color: ${props => props.theme.primary};
  line-height: 1;
`;

const PageHeader = ({ title, left, right }) => {
  return (
    <HeaderContainer>
      <LeftSection>{left}</LeftSection>
      <CenterSection>
        <Title>{title}</Title>
      </CenterSection>
      <RightSection>{right}</RightSection>
    </HeaderContainer>
  );
};

export default PageHeader;