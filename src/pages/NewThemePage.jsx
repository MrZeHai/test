import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { lightTheme, darkTheme, mothPurpleTheme, blueberryBlueTheme, pickleYellowTheme, toxicGreenTheme, leatherOrangeTheme } from '../styles/theme';
import PageHeader, { HeaderButton } from '../components/PageHeader';

const ThemePageContainer = styled.div`
  padding: 0 20px;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;

const ThemeModeToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ThemeModeButton = styled.button`
  background-color: ${props => (props.active ? props.theme.toggleBorder : props.theme.body)};
  color: ${props => (props.active ? props.theme.text : props.theme.text)};
  border: 1px solid ${props => props.theme.toggleBorder};
  padding: 10px 20px;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  &:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const ThemeCard = styled.div`
  background-color: ${props => props.cardTheme.body};
  border: 2px solid ${props => (props.selected ? props.theme.text : props.cardTheme.toggleBorder)};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  text-align: center;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
`;

const ThemeName = styled.h3`
  margin-top: 10px;
  font-size: 16px;
  color: ${props => props.cardTheme.text};
`;

const Checkmark = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  color: ${props => props.theme.text};
`;

const NewThemePage = ({ setTheme, currentTheme }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('Dark');

  const themes = [
    { name: '紫色', theme: mothPurpleTheme },
    { name: '蓝色', theme: blueberryBlueTheme },
    { name: '黄色', theme: pickleYellowTheme },
    { name: '绿色', theme: toxicGreenTheme },
    { name: '橙色', theme: leatherOrangeTheme },
  ];

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'Light') {
      setTheme(lightTheme);
    } else if (selectedMode === 'Dark') {
      setTheme(darkTheme);
    }
  };

  return (
    <ThemePageContainer>
      <PageHeader
        title="主题"
        left={<HeaderButton onClick={() => navigate('/')}>‹</HeaderButton>}
      />
      <ThemeModeToggle>
        <ThemeModeButton active={mode === 'System'} onClick={() => handleModeChange('System')}>系统</ThemeModeButton>
        <ThemeModeButton active={mode === 'Dark'} onClick={() => handleModeChange('Dark')}>深色</ThemeModeButton>
        <ThemeModeButton active={mode === 'Light'} onClick={() => handleModeChange('Light')}>浅色</ThemeModeButton>
      </ThemeModeToggle>
      <ThemeGrid>
        {themes.map((t) => (
          <ThemeCard 
            key={t.name} 
            onClick={() => handleThemeChange(t.theme)} 
            cardTheme={t.theme} 
            selected={currentTheme.name === t.theme.name}
          >
            {currentTheme.name === t.theme.name && <Checkmark>✓</Checkmark>}
            <div style={{ width: '100%', height: '80px', backgroundColor: t.theme.body, borderRadius: '4px' }}></div>
            <ThemeName cardTheme={t.theme}>{t.name}</ThemeName>
          </ThemeCard>
        ))}
      </ThemeGrid>
    </ThemePageContainer>
  );
};

export default NewThemePage;