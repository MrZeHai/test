import React from 'react';
import styled from 'styled-components';
import Token from './Token';
import { useNavigate } from 'react-router-dom';

const AccountItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  border-bottom: 1px solid ${props => props.theme.toggleBorder || '#eee'};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.background};
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const EditIndicator = styled.span`
  color: #8e8e93;
  font-size: 24px;
  font-weight: bold;
`;

const AccountItem = ({ account }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit-account/${account.id}`);
  };

  return (
    <AccountItemContainer onClick={handleEditClick}>
      <AccountInfo>
        <AccountName>{account.name}</AccountName>
      </AccountInfo>
      <RightSection>
        <Token secret={account.secret} />
        <EditIndicator>›</EditIndicator>
      </RightSection>
    </AccountItemContainer>
  );
};

export default AccountItem;