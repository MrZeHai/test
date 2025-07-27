import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountItem from '../components/AccountItem';
import { AccountsContext } from '../App';
import PageHeader, { HeaderLink } from '../components/PageHeader';

const HomePageContainer = styled.div`
  padding: 0 20px;
  padding-bottom: 100px;
`;

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoAccounts = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  margin-top: 50px;
`;

const AddAccountButton = styled(Link)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const HomePage = () => {
  const { accounts } = useContext(AccountsContext);

  return (
    <HomePageContainer>
      <PageHeader
        title="身份验证器"
        right={<HeaderLink to="/settings">⚙️</HeaderLink>}
      />
      <AccountList>
        {accounts.length > 0 ? (
          accounts.map(account => (
            <AccountItem key={account.id} account={account} />
          ))
        ) : (
          <NoAccounts>暂无内容</NoAccounts>
        )}
      </AccountList>
      <AddAccountButton to="/add-account">+</AddAccountButton>
    </HomePageContainer>
  );
};

export default HomePage;