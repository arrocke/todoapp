/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useAuth } from "../contexts/auth";
import ViewHeader from "../components/ViewHeader";
import ViewTitle from "../components/ViewTitle";
import FormLabel from "../components/FormLabel";
import { breakpoints } from "../styles";
import TextInput from "../components/TextInput";
import ButtonInput from "../components/ButtonInput";
import { useState } from "react";

const AccountView: React.FC = () => {
  const [{ loading, error }, setFormState] = useState<{
    loading: boolean;
    error?: string;
  }>({ loading: false });
  const { user, update } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    ...(user || {})
  });

  return (
    user && (
      <div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <ViewHeader>
          <ViewTitle title="Account" />
        </ViewHeader>
        <form
          css={{
            display: "flex",
            flexDirection: "column",
            padding: "8px 32px 320px 32px",
            overflowX: "auto",
            [breakpoints.medium]: {
              width: "auto",
              display: "grid",
              grid: `
                ". firstname-label firstname-input firstname-input ." auto
                ". lastname-label lastname-input lastname-input ." auto
                ". email-label email-input email-input ." auto
                ". password-label password-input password-input ." auto
                ". confirm-label confirm-input confirm-input ." auto
                ". error error submit ." auto
                / 1fr 144px 240px 80px 1fr
              `,
              gridGap: 16
            }
          }}
          onSubmit={async e => {
            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
              setFormState({
                loading,
                error: "Password and confirmation do not match."
              });
            } else {
              setFormState({ loading: true });
              const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
              } = formData;
              await update({
                firstName,
                lastName,
                email,
                ...(confirmPassword === password &&
                  password.length > 0 && { password })
              });
              setFormData({
                ...formData,
                password: "",
                confirmPassword: ""
              });
              setFormState({ loading: false });
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
            role={error ? "alert" : undefined}
          >
            {error}
          </div>
          <FormLabel htmlFor="firstname" css={{ gridArea: "firstname-label" }}>
            First Name
          </FormLabel>
          <TextInput
            id="firstname"
            css={{ gridArea: "firstname-input" }}
            value={formData.firstName}
            onChange={e => {
              setFormData({
                ...formData,
                firstName: e.target.value
              });
            }}
          />
          <FormLabel htmlFor="lastname" css={{ gridArea: "lastname-label" }}>
            Last Name
          </FormLabel>
          <TextInput
            id="lastname"
            css={{ gridArea: "lastname-input" }}
            value={formData.lastName}
            onChange={e => {
              setFormData({
                ...formData,
                lastName: e.target.value
              });
            }}
          />
          <FormLabel htmlFor="email" css={{ gridArea: "email-label" }}>
            Email Address
          </FormLabel>
          <TextInput
            id="email"
            type="email"
            css={{ gridArea: "email-input" }}
            value={formData.email}
            onChange={e => {
              setFormData({
                ...formData,
                email: e.target.value
              });
            }}
          />
          <FormLabel htmlFor="password" css={{ gridArea: "password-label" }}>
            Change Password
          </FormLabel>
          <TextInput
            id="password"
            type="password"
            css={{ gridArea: "password-input" }}
            value={formData.password}
            onChange={e => {
              setFormData({
                ...formData,
                password: e.target.value
              });
            }}
          />
          <FormLabel htmlFor="confirm" css={{ gridArea: "confirm-label" }}>
            Confirm Password
          </FormLabel>
          <TextInput
            id="confirm"
            type="password"
            css={{ gridArea: "confirm-input" }}
            value={formData.confirmPassword}
            onChange={e => {
              setFormData({
                ...formData,
                confirmPassword: e.target.value
              });
            }}
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
            Submit
          </ButtonInput>
        </form>
      </div>
    )
  );
};

export default AccountView;
