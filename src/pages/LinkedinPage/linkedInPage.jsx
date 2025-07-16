import React, {  useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import styles from "./style.module.css"


function LinkedInPage() {

  const location = useLocation();
  const { linkedInLogin } = useLinkedIn({
    clientId:'77syyjt6azvxdf',//import.meta.env.VITE_CLIENT_ID,git 
    redirectUri: `${window.location.origin}/members/general`,
    scope: 'openid profile', 
    onSuccess: (code) => {
      console.log('LinkedIn code received:', code);
      window.location.href = `http://localhost:2500/auth/linkedin/callback?code=${code}`;
    },
    onError: (error) => {
      console.error('LinkedIn Error:', error);
    },
  });

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');
    if (code) {
      console.log('LinkedIn returned code:', code);
    }
    if (error) {
      console.log('LinkedIn auth error:', error);
    }
  }, [location]);

  return (
    <div className={styles['linkedin-button-wrapper']}>
      {/* <h2>Sign in with LinkedIn</h2> */}
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Sign in with LinkedIn"
        className={styles['linkedin-img-full']}      />
    </div>
  );
}

export default LinkedInPage