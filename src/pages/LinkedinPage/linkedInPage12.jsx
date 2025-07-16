import React, {  useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import {api} from '../../helpers/api';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import styles from "./style.module.css"


function LinkedInPage() {

  const location = useLocation();
  const { linkedInLogin } = useLinkedIn({
    clientId:'77syyjt6azvxdf',//import.meta.env.VITE_CLIENT_ID,git 
    redirectUri:'http://localhost:5173/members/general', //`${window.location.origin}/members/general`, // Adjust this to your redirect URI
    //redirectUri: `${window.location.origin}/members/general`,
    scope: 'openid profile email',

    onSuccess: (code) => {
      console.log('LinkedIn code received:', code);
      handleLinkedInLogin(code);
    },
    onError: (error) => {
      console.error('LinkedIn Error:', error);
    },
  });


  function handleLinkedInLogin(code) {
  console.log('📡 שולחת את הקוד לשרת...', code);

  api({
    url: 'auth/linkedin/callback',
    method: 'GET',
    params: { code }
  })
    .then(response => {
      console.log('✅ LinkedIn API response:', response);
    })
    .catch(error => {
      console.error(' LinkedIn API error:', error);
    });
}

 

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');
    if (code) {
      console.log('LinkedIn returned code:', code);
      handleLinkedInLogin(code); 
    }
    if (error) {
      console.log('LinkedIn auth error:', error);
    }
  }, [location]);

  return (
    <div className={styles['linkedin-button-wrapper']}>

      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Sign in with LinkedIn"
        className={styles['linkedin-img-full']}      />
    </div>
  );
}

export default LinkedInPage
