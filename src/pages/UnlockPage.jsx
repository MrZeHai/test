import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UnlockPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.theme.body};
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
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

const Button = styled.button`
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.theme.primary};
  color: white;
`;

const UnlockPage = ({ onUnlock }) => {
  const [password, setPasswordValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('app_password');
    if (password === storedPassword) {
      onUnlock();
      navigate('/');
    } else {
      alert('密码不正确');
    }
  };

  return (
    <UnlockPageContainer>
      <Title>输入密码</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="输入密码"
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <Button type="submit">解锁</Button>
      </Form>
    </UnlockPageContainer>
  );
};

export default UnlockPage;