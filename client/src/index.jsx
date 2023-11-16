import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context'
import { UserProviderWrapper } from './contexts/user.context'
import { MessageProviderWrapper } from './contexts/userMessage.context'

const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <UserProviderWrapper>
          <MessageProviderWrapper>
            <App />
          </MessageProviderWrapper>
        </UserProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);