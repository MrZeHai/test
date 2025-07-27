import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TokenContainer = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.text};
  letter-spacing: 4px;
`;

const ProgressBarContainer = styled.div`
  width: 40px;
  height: 40px;
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

  const [token, setToken] = useState(() => generateToken(secret));

  const [timeLeft, setTimeLeft] = useState(() => {
    const storedDeadline = localStorage.getItem(`timer-deadline-${secret}`);
    if (storedDeadline) {
      const deadline = parseInt(storedDeadline, 10);
      const remaining = deadline - Date.now();
      if (remaining > 0) {
        return Math.round(remaining / 1000);
      }
    }
    const newDeadline = Date.now() + 30000;
    localStorage.setItem(`timer-deadline-${secret}`, newDeadline);
    return 30;
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          setToken(generateToken(secret));
          const newDeadline = Date.now() + 30000;
          localStorage.setItem(`timer-deadline-${secret}`, newDeadline);
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [secret]);

  return (
    <TokenWrapper>
      <ProgressBarContainer>
        <CircularProgressbar
          value={timeLeft}
          maxValue={30}
          text={`${timeLeft}s`}
          styles={buildStyles({
            textColor: theme.text,
            pathColor: theme.text,
            trailColor: '#d6d6d6',
          })}
        />
      </ProgressBarContainer>
      <TokenContainer>
        {token.slice(0, 3)} {token.slice(3, 6)}
      </TokenContainer>
    </TokenWrapper>
  );
};

export default Token;