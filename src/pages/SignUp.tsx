import React, { useState } from "react";
import { sendEmail, verifyCode, storeSignUp } from "../api/auth";
import * as S from "../styles/pages/signUp";
import { FaUser, FaLock, FaEnvelope, FaKey } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "",
  });
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendVerification = async () => {
    try {
      await sendEmail(formData.email);
      setIsEmailSent(true);
      toast.success("인증 코드가 이메일로 전송되었습니다.");
    } catch (error) {
      alert("인증 코드 전송에 실패했습니다.");
      toast.error("인증 코드 전송에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await verifyCode(formData.email, formData.verificationCode);
      if (res) {
        setIsVerified(true);
        toast.success("이메일이 인증되었습니다.");
      } else {
        toast.error("인증에 실패했습니다.");
      }
    } catch (error) {
      toast.error("인증에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      toast.error("이메일 인증이 필요합니다.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.username === "") {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    if (formData.email === "") {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    if (formData.password === "" || formData.password.length < 8) {
      toast.error("비밀번호를 8자 이상 입력해주세요.");
      return;
    }

    if (
      formData.passwordConfirm === "" ||
      formData.passwordConfirm !== formData.password
    ) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await storeSignUp(
        formData.email,
        formData.password,
        formData.username
      );
      if (res) {
        toast.success("회원가입이 완료되었습니다.");
        navigate("/signin");
      } else {
        toast.error("회원가입에 실패했습니다.");
      }
    } catch (error) {
      toast.error("회원가입에 실패했습니다.");
    }
  };

  return (
    <S.Container>
      <NavBar />
      <S.Form onSubmit={handleSubmit}>
        <S.Title>회원가입</S.Title>

        <S.InputGroup>
          <S.Label>
            <FaUser />
          </S.Label>
          <S.Input
            $width="200px"
            type="text"
            name="username"
            placeholder="닉네임"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <FaEnvelope />
          </S.Label>
          <S.EmailWrapper>
            <S.Input
              $width="150px"
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              disabled={isVerified}
              required
            />
          </S.EmailWrapper>
          <S.VerificationButton
            type="button"
            onClick={handleSendVerification}
            disabled={isVerified}
          >
            코드 전송
          </S.VerificationButton>
        </S.InputGroup>

        {isEmailSent && (
          <S.InputGroup>
            <S.Label>
              <FaKey />
            </S.Label>
            <S.EmailWrapper>
              <S.Input
                $width="150px"
                type="text"
                name="verificationCode"
                placeholder="인증코드"
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
            <FaLock />
          </S.Label>
          <S.Input
            $width="200px"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <FaLock />
          </S.Label>
          <S.Input
            $width="200px"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
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
