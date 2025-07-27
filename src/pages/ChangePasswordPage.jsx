import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const ChangePasswordPageContainer = styled.div`
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

const Button = styled.button`
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.theme.primary};
  color: white;
  margin-top: 20px;
`;

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('app_password');

    if (currentPassword !== storedPassword) {
      alert('当前密码不正确。');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('新密码不匹配。');
      return;
    }

    localStorage.setItem('app_password', newPassword);
    alert('密码修改成功。');
    navigate('/settings');
  };

  return (
    <ChangePasswordPageContainer>
      <PageHeader
        title="修改密码"
        left={<HeaderButton onClick={() => navigate('/settings')}>‹</HeaderButton>}
      />
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>当前密码</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>新密码</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>确认新密码</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
        <Button type="submit">修改密码</Button>
      </Form>
    </ChangePasswordPageContainer>
  );
};

export default ChangePasswordPage;