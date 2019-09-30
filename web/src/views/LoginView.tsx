/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import TextInput from "../components/TextInput";
import ButtonInput from "../components/ButtonInput";
import FormLabel from "../components/FormLabel";
import { breakpoints } from "../styles";
import ViewTitle from "../components/ViewTitle";
import ViewHeader from "../components/ViewHeader";
import { useAuth } from "../contexts/auth";
import { RouteComponentProps } from "react-router";

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const { login } = useAuth();
  const [{ loading, failed }, setFormState] = useState({
    loading: false,
    failed: false
  });
  const [formData, setFormData] = useState({ email: "", password: "" });

  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        [breakpoints.medium]: {}
      }}
    >
      <ViewHeader>
        <ViewTitle title="Log In" />
      </ViewHeader>
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          margin: "0 32px",
          [breakpoints.medium]: {
            width: "auto",
            display: "grid",
            grid: `
              ". email-label email-input email-input ." auto
              ". password-label password-input password-input ." auto
              ". error error submit ." auto
              / 1fr 72px 240px 80px 1fr
            `,
            gridGap: 16
          }
        }}
        onSubmit={async e => {
          e.preventDefault();
          setFormState({ loading: true, failed: false });
          if (await login(formData.email, formData.password)) {
            setFormState({ loading: false, failed: false });
          } else {
            setFormState({ loading: false, failed: true });
          }
        }}
      >
        <div
          css={{
            height: 46,
            lineHeight: "46px",
            width: "100%",
            color: "red",
            fontWeight: "bold",
            [breakpoints.medium]: {
              gridArea: "error"
            }
          }}
          role={failed ? "alert" : undefined}
        >
          {failed && "Username or password are incorrect."}
        </div>
        <FormLabel htmlFor="email" css={{ gridArea: "email-label" }}>
          Email
        </FormLabel>
        <TextInput
          id="email"
          value={formData.email}
          onChange={e => {
            setFormData({
              ...formData,
              email: e.target.value
            });
            setFormState({ loading, failed: false });
          }}
          css={{ gridArea: "email-input" }}
        />
        <FormLabel htmlFor="password" css={{ gridArea: "password-label" }}>
          Password
        </FormLabel>
        <TextInput
          id="password"
          type="password"
          value={formData.password}
          onChange={e => {
            setFormData({
              ...formData,
              password: e.target.value
            });
            setFormState({ loading, failed: false });
          }}
          css={{ gridArea: "password-input" }}
        />
        <ButtonInput
          type="submit"
          disabled={loading}
          css={{
            gridArea: "submit",
            width: "100%",
            justifySelf: "end",
            margin: "16px 0 0 0",
            [breakpoints.medium]: {
              margin: 0
            }
          }}
        >
          Log In
        </ButtonInput>
      </form>
    </div>
  );
};

export default LoginView;
