import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AccountsContext } from '../App';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const EditAccountPageContainer = styled.div`
  padding: 0 20px;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  font-size: 16px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const ButtonGroup = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const ActionButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const SaveButton = styled(ActionButton)`
  background-color: ${props => props.theme.primary};
  color: white;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #ff3b30; /* iOS red */
  color: white;
`;

const EditAccountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts, updateAccount, deleteAccount } = useContext(AccountsContext);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');

  useEffect(() => {
    const currentAccount = accounts.find(acc => acc.id === parseInt(id));
    if (currentAccount) {
      setAccount(currentAccount);
      setName(currentAccount.name);
      setSecret(currentAccount.secret);
    }
  }, [accounts, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && secret) {
      updateAccount({ ...account, name, secret });
      navigate('/');
    }
  };

  const handleDelete = () => {
    if (window.confirm('你确定要删除此账户吗？')) {
      deleteAccount(account.id);
      navigate('/');
    }
  };

  if (!account) {
    return <div>加载中...</div>;
  }

  return (
    <EditAccountPageContainer>
      <PageHeader
        title="编辑账户"
        left={<HeaderButton onClick={() => navigate('/')}>‹</HeaderButton>}
      />
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>账户名称</Label>
          <Input
            type="text"
            placeholder="输入账户名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>密钥</Label>
          <Input
            type="text"
            placeholder="输入密钥"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </InputGroup>
      </Form>
      <ButtonGroup>
        <SaveButton onClick={handleSubmit}>保存更改</SaveButton>
        <DeleteButton onClick={handleDelete}>删除账户</DeleteButton>
      </ButtonGroup>
    </EditAccountPageContainer>
  );
};

export default EditAccountPage;