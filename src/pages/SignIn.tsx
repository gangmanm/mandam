import * as S from "../styles/pages/signIn";
import { useState } from "react";
import { checkUser, signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname);

    const handlePopState = () => {
      navigate('/list', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    const checkLogin = async () => {
      const data = await checkUser();
      if (data.success) {
        navigate("/list");
        setAuth(true);
      }
    };

    checkLogin();
  }, [navigate]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn(formData.email, formData.password);
    if (res.success) {
      localStorage.setItem("userId", res.data.uuid);
      navigate("/list");
    } else {
      toast.error("이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>로그인</S.Title>
        <S.InputGroup>
          <S.Label>
            <FaUser />
          </S.Label>
          <S.Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <FaLock />
          </S.Label>
          <S.Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </S.InputGroup>
        <S.SubmitButton type="submit">로그인</S.SubmitButton>
        <S.SignUpLink href="/signup">회원가입 &gt;</S.SignUpLink>
      </S.Form>
    </S.Container>
  );
};

export default SignIn;
