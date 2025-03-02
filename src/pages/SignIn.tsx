import * as S from "../styles/pages/signIn";
import { useState } from "react";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn(formData.email, formData.password);
    if(res){
      navigate("/list");
    }
    else{
      alert("로그인 실패");
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>로그인</S.Title>
        <S.InputGroup>
          <S.Label>
          </S.Label>
          <S.Input
              type="email"
              name="email"
              placeholder='이메일'
              value={formData.email}
              onChange={handleChange}
              required
            />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
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
        <S.SubmitButton type="submit">로그인</S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default SignIn;
