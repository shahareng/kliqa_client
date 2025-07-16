import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { api } from '../../helpers/api';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import styles from './style.module.css';

function LinkedInPage() {
  const location = useLocation();
  const sentCode = useRef(false); // כדי למנוע שליחה כפולה של הקוד

  const { linkedInLogin } = useLinkedIn({
    clientId: '77syyjt6azvxdf', // ניתן להחליף ב: import.meta.env.VITE_CLIENT_ID אם מוגדר בקובץ env
    redirectUri: 'http://localhost:5173/members/general', // אותו כתובת כמו ב־LinkedIn Developers
    scope: 'openid profile email', // אישורים שיש לך בפועל
    onSuccess: (code) => {
      console.log('✅ LinkedIn code received:', code);
      if (!sentCode.current) {
        sentCode.current = true;
        handleLinkedInLogin(code);
      }
    },
    onError: (error) => {
      console.error('❌ LinkedIn Error:', error);
    },
  });

  const handleLinkedInLogin = (code) => {
    console.log('📡 שולחת את הקוד לשרת...', code);
    api({
      url: 'auth/linkedin/callback',
      method: 'GET',
      params: { code }
    })
      .then((response) => {
        console.log('✅ LinkedIn API response:', response.data);
        // כאן אפשר לשמור את המשתמש ב־context או לנווט לדף הבא
      })
      .catch((error) => {
        console.error('❌ LinkedIn API error:', error);
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (code && !sentCode.current) {
      sentCode.current = true;
      console.log('🔄 LinkedIn returned code from URL:', code);
      handleLinkedInLogin(code);
    }

    if (error) {
      console.log('❌ LinkedIn auth error:', error);
    }
  }, [location]);

  return (
    <div className={styles['linkedin-button-wrapper']}>
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Sign in with LinkedIn"
        className={styles['linkedin-img-full']}
      />
    </div>
  );
}

export default LinkedInPage;
