import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import StyledLink from "../../components/StyledLink";
import useAuth from "../../../../hooks/useAuth";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  let { setUser } = useAuth();
  let navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = useCallback(
    (data: any) => {
      if (data["status-code"] === 201) {
        // Store token in localStorage and set tokenExpiration time
        const now = Date.now();
        const tokenExpirationTime = now + 1800 * 1000;
        localStorage.setItem(
          "tokenExpiresIn",
          JSON.stringify(tokenExpirationTime)
        );
        localStorage.setItem("accessToken", data["access-token"]);

        // prepare user data and add to context
        let { id: userId, username: name, email } = data["user-info"];
        let userCredentials = { userId, name, email };
        if (setUser) {
          setUser(userCredentials);
        }

        // redirect user to app
        navigate("/app");
      } else {
        setError("Invalid login credentials");
      }
    },
    [navigate, setUser]
  );

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      handleLoginSuccess(data);
    } catch (err: any) {
      console.error("Login error:", err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ maxWidth: 400, mx: "auto" }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="username"
        control={control}
        errors={errors}
        rules={{ required: "Name is required" }}
        label="Name"
        defaultValue=""
      />

      <Input
        name="password"
        control={control}
        label="Password"
        errors={errors}
        type="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d).+$/,
            message:
              "Password must include at least one uppercase letter and one number",
          },
        }}
      />

      <Box>
        <Button variant="contained" type="submit">
          Login
        </Button>
        <StyledLink to="/authentication/sign-up">Sign Up</StyledLink>
        <StyledLink to="/authentication/reset-password" replace>
          Forgot password?
        </StyledLink>
      </Box>
      {error && (
        <Typography
          sx={{
            color: (theme) => theme.palette.error.main,
            textAlign: "center",
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
