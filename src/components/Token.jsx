import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TokenContainer = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.text};
  letter-spacing: 3px;
`;

const ProgressBarContainer = styled.div`
  width: 40px;
  height: 40px;
`;

const Icon = styled.span`
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px;
  color: ${props => props.theme.textSecondary};
`;

const generateToken = (secret) => {
  const epoch = Math.round(new Date().getTime() / 1000.0);
  const timeStep = 30;
  const t = Math.floor(epoch / timeStep);
  const seed = t.toString() + secret;
  const hash = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const token = (hash & 0x7FFFFFFF) % 1000000;
  return token.toString().padStart(6, '0');
};

const Token = ({ secret }) => {
  const theme = useContext(ThemeContext);

  const calculateTimeLeft = () => {
    const epochSeconds = Math.floor(new Date().getTime() / 1000);
    return 30 - (epochSeconds % 30);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isVisible, setIsVisible] = useState(true);
  const token = generateToken(secret);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleCopy = (e) => {
    e.stopPropagation();
    const textToCopy = token;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('已复制到剪贴板');
    } catch (err) {
        alert('复制失败');
    }
    document.body.removeChild(textArea);
  };

  const toggleVisibility = (e) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <TokenWrapper>
      <ProgressBarContainer>
        <CircularProgressbar
          value={timeLeft}
          maxValue={30}
          text={`${timeLeft}s`}
          styles={buildStyles({
            textColor: theme.text,
            pathColor: theme.primary,
            trailColor: theme.textSecondary,
            textSize: '35px',
          })}
        />
      </ProgressBarContainer>
      <TokenContainer>
        {isVisible ? `${token.slice(0, 3)} ${token.slice(3, 6)}` : '*** ***'}
      </TokenContainer>
      <Icon onClick={handleCopy}>📋</Icon>
      <Icon onClick={toggleVisibility}>{isVisible ? '👁️' : '👁️‍🗨️'}</Icon>
    </TokenWrapper>
  );
};

export default Token;