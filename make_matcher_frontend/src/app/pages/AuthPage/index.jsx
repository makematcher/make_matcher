import { LoginComponent } from 'app/components/LoginComponent/Loadable';
import React, { useState } from 'react';

export function AuthPage() {
  return <LoginComponent />;

  // later can also add components like login with google, etc.
}
