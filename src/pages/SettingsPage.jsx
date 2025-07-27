import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const SettingsPageContainer = styled.div`
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
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.borderColor};

  &:hover {
    background-color: ${props => props.theme.body};
  }
`;

const ButtonOption = styled.button`
  background-color: ${props => props.theme.background};
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: ${props => props.theme.text};
  font-size: 18px;
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.borderColor};
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.body};
  }
`;

const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitchLabel = styled.span`
  margin-right: 10px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 51px;
  height: 31px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 23px;
    width: 23px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${props => props.theme.primary};
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(20px);
  }
`;

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(
    () => localStorage.getItem('password_disabled') === 'true'
  );

  const handleDisablePasswordToggle = () => {
    const newDisabledState = !isPasswordDisabled;
    setIsPasswordDisabled(newDisabledState);
    if (newDisabledState) {
      localStorage.setItem('password_disabled', 'true');
    } else {
      localStorage.removeItem('password_disabled');
      if (!localStorage.getItem('app_password')) {
        navigate('/setup-password');
      }
    }
  };

  return (
    <SettingsPageContainer>
      <PageHeader
        title="设置"
        left={<HeaderButton onClick={() => navigate('/')}>‹</HeaderButton>}
      />
      <OptionList>
        <Option to="/change-password">
          <span>修改密码</span>
        </Option>
        <Option to="/theme">
          <span>主题</span>
        </Option>
        <Option as="div">
          <span>禁用密码</span>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={isPasswordDisabled}
              onChange={handleDisablePasswordToggle}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </Option>
      </OptionList>
    </SettingsPageContainer>
  );
};

export default SettingsPage;