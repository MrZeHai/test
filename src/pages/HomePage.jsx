import React, { useContext, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountItem from '../components/AccountItem';
import { AccountsContext } from '../App';
import PageHeader, { HeaderLink } from '../components/PageHeader';

const SortButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.text};
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 14px;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

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
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedAndFilteredAccounts = useMemo(() => {
    return [...accounts]
      .filter(account =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [accounts, sortOrder, searchQuery]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <HomePageContainer>
      <PageHeader
        title="身份验证器"
        right={<HeaderLink to="/settings">⚙️</HeaderLink>}
      />
      <ControlsContainer>
        <SearchInput
          type="text"
          placeholder="搜索账户..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SortButton onClick={toggleSortOrder}>
          <span>名称</span>
          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
        </SortButton>
      </ControlsContainer>
      <AccountList>
        {sortedAndFilteredAccounts.length > 0 ? (
          sortedAndFilteredAccounts.map(account => (
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