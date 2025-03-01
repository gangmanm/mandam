import React, { useState } from 'react';
import { sendEmail, verifyCode, storeSignUp } from '../api/auth';
import * as S from '../styles/pages/signUp';
import { Email, Lock, Person, VpnKey } from '@material-ui/icons';

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    verificationCode: '',
  });
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendVerification = async () => {
    try {
      await sendEmail(formData.email);
      setIsEmailSent(true);
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) { 
      alert('인증 코드 전송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await verifyCode(formData.email, formData.verificationCode);
      console.log(res);
      if(res){
        setIsVerified(true);
        alert('이메일이 인증되었습니다.');
      }
        else{
          alert('인증에 실패했습니다.');
        }
    } catch (error) {
      alert('인증에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      alert('이메일 인증이 필요합니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // TODO: 회원가입 API 연동
      await storeSignUp(formData.email, formData.password, formData.username);
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>회원가입</S.Title>
        
        <S.InputGroup>
          <S.Label>
            <Person style={{ color: 'white' }} />
          </S.Label>
          <S.Input
            type="text"
            name="username"
            placeholder='닉네임'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <Email style={{ color: 'white' }} />
          </S.Label>
          <S.EmailWrapper>
            <S.Input
              type="email"
              name="email"
              placeholder='이메일'
              value={formData.email}
              onChange={handleChange}
              disabled={isVerified}
              required
            />
            <S.VerificationButton
              type="button"
              onClick={handleSendVerification}
              disabled={isVerified}
            >
              인증코드 전송
            </S.VerificationButton>
          </S.EmailWrapper>
        </S.InputGroup>

        {isEmailSent && (
          <S.InputGroup>
            <S.Label>
              <VpnKey style={{ color: 'white' }} />
            </S.Label>
            <S.EmailWrapper>
              <S.Input
                type="text"
                name="verificationCode"
                placeholder='인증코드'
                value={formData.verificationCode}
                onChange={handleChange}
                disabled={isVerified}
                required
              />
              <S.VerificationButton
                type="button"
                onClick={handleVerifyCode}
                disabled={isVerified}
              >
                확인
              </S.VerificationButton>
            </S.EmailWrapper>
          </S.InputGroup>
        )}

        <S.InputGroup>
          <S.Label>
            <Lock style={{ color: 'white' }} />
          </S.Label>
          <S.Input
            type="password"
            name="password"
            placeholder='비밀번호'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <Lock style={{ color: 'white' }} />
          </S.Label>
          <S.Input
            type="password"
            name="passwordConfirm"
            placeholder='비밀번호 확인'
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
          />
        </S.InputGroup>

        <S.SubmitButton type="submit">가입하기</S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default SignUp;