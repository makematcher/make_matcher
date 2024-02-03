import React, { useState } from 'react';
import { Signup } from '../../components/SignupComponent/Signup';
import { Login } from '../../components/LoginComponent/Login';

export function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(true);

  return isRegistered ? <Login userStatus={isRegistered} /> : <Signup />;
}
