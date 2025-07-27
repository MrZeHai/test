import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const AddAccountPageContainer = styled.div`
  padding: 0 20px;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Option = styled(Link)`
  background-color: ${props => props.theme.background};
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: ${props => props.theme.text};
  font-size: 18px;
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.borderColor};

  &:hover {
    background-color: ${props => props.theme.body};
  }
`;

const AddAccountPage = () => {
  const navigate = useNavigate();

  return (
    <AddAccountPageContainer>
      <PageHeader
        title="添加账户"
        left={<HeaderButton onClick={() => navigate('/')}>‹</HeaderButton>}
      />
      <OptionList>
        <Option to="/add-account-manually">
          <span>输入设置密钥</span>
        </Option>
        {/* In a real app, this would open the camera */}
        <Option to="#" onClick={() => alert('此演示中未实现二维码扫描功能。')}>
          <span>扫描二维码</span>
        </Option>
      </OptionList>
    </AddAccountPageContainer>
  );
};

export default AddAccountPage;