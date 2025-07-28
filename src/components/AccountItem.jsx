import React from 'react';
import styled from 'styled-components';
import Token from './Token';
import { useNavigate } from 'react-router-dom';

const AccountItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
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
  gap: 8px;
`;

const AccountName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.textSecondary};
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
        <Token secret={account.secret} />
      </AccountInfo>
      <EditIndicator>›</EditIndicator>
    </AccountItemContainer>
  );
};

export default AccountItem;