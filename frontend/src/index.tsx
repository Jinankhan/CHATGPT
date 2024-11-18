import ReactDOM from 'react-dom';
import App from './App';
import { ChatProvider } from './context';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
// eslint-disable-next-line react/no-deprecated
const clientId = process.env.REACT_APP_CLIENTID as string;
const domainId = process.env.REACT_APP_DOMAINID as string;
ReactDOM.render(
  <ChatProvider>
    <BrowserRouter>
      <Auth0Provider
        domain={domainId}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ChatProvider>,
  document.getElementById('root')
);
