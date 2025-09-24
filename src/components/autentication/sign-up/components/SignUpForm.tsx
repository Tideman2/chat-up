import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import StyledLink from "../../components/StyledLink";

type FormData = {
  email: string;
  name: string; // This matches what backend expects as 'name'
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [error, setError] = useState<boolean | string>(false);

  const handleRegisterSuccess = useCallback(
    (data: any) => {
      console.log(data);
      if (data["status-code"] === 201) {
        const now = Date.now();
        const tokenExpirationTime = now + 1800 * 1000;

        localStorage.setItem(
          "tokenExpiresIn",
          JSON.stringify(tokenExpirationTime)
        );
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data["access-token"])
        );

        let { id: userId, username: name, email } = data["user-info"];
        let userCredentials = { userId, name, email };

        if (setUser) {
          setUser(userCredentials);
        }
        navigate("/app", { replace: true });
      } else {
        setError("Signup failed, please try again.");
      }
    },
    [navigate, setUser]
  );

  // const onSubmit: SubmitHandler<FormData> = async (data) => {
  //   if (data.password !== data.confirmPassword) {
  //     setError("Password is different from Confirm-password");
  //     setTimeout(() => setError(false), 3000);
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: data.email,
  //         username: data.name,
  //         password: data.password,
  //       }),
  //     });

  //     const result = await response.json();
  //     handleRegisterSuccess(result);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Network error, please try again.");
  //   }
  // };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Password is different from Confirm-password");
      setTimeout(() => setError(false), 3000);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          password: data.password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        setError(`Registration failed: ${errorText}`);
        return;
      }

      const result = await response.json();
      handleRegisterSuccess(result);
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
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
        name="name"
        control={control}
        label="Name"
        errors={errors}
        rules={{ required: "Name is required" }}
      />

      <Input
        name="email"
        control={control}
        label="Email"
        errors={errors}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid email format",
          },
        }}
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

      <Input
        name="confirmPassword"
        control={control}
        label="Confirm Password"
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
          Sign Up
        </Button>
        <StyledLink to={"/authentication/login"}>Login</StyledLink>
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
