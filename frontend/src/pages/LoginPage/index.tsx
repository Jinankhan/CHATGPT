import { Typography } from '@mui/material';
import Login from '../../components/organisms/login';
import LoginTemplate from '../../templates/loginTemplate';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const handleClick = (value: string) => {
    if (value.includes('Google')) {
      loginWithRedirect({
        authorizationParams: {
          authorizationParams: { connection: 'google-oauth2' },
          display: 'popup'
        }
      });
    }
  };
  return (
    <LoginTemplate
      header={
        <img
          src="https://auth.openai.com/assets/openai-logo-DmWoKcI3.svg"
          alt="open-ai"
          width={32}
          height={32}
        />
      }
      content={<Login handleClick={handleClick} />}
      footer={
        <Typography
          fontSize="14px"
          sx={{ display: 'inline', color: '#10A37F' }}
        >
          Term of use
          <Typography
            color="#10A37F"
            fontSize="14px"
            sx={{ display: 'inline' }}
          >
            &nbsp;| Privacy policy
          </Typography>
        </Typography>
      }
    />
  );
};

export default LoginPage;
