import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AccountsContext } from '../App';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const AddAccountManuallyPageContainer = styled.div`
  padding: 0 20px;
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

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }

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

const AddAccountManuallyPage = () => {
  const navigate = useNavigate();
  const { addAccount } = useContext(AccountsContext);
  const [accountName, setAccountName] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountName && secretKey) {
      addAccount({ name: accountName, secret: secretKey });
      navigate('/');
    }
  };

  return (
    <AddAccountManuallyPageContainer>
      <PageHeader
        title="输入详细信息"
        left={<HeaderButton onClick={() => navigate('/add-account')}>‹</HeaderButton>}
      />
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>账户名称</Label>
          <Input
            type="text"
            placeholder="输入账户名称"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>密钥</Label>
          <Input
            type="text"
            placeholder="你的密钥"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </InputGroup>
      </Form>
      <ButtonGroup>
        <SaveButton onClick={handleSubmit}>保存</SaveButton>
      </ButtonGroup>
    </AddAccountManuallyPageContainer>
  );
};

export default AddAccountManuallyPage;