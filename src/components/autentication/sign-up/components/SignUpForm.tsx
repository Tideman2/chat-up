import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import StyledLink from "../../components/StyledLink";
import { useAuthSocket } from "../../../../hooks/socket/useAuthSocket";

type FormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  let navigate = useNavigate();
  const { signup } = useAuth();

  let handleRegisterSuccess = useCallback(
    (data: any) => {
      const accessToken = data["access-token"];
      localStorage.setItem("accessToken", accessToken);
      navigate("/app", { replace: true });
    },
    [navigate]
  );

  const { registerUser } = useAuthSocket(handleRegisterSuccess);

  const [error, setError] = useState<boolean | string>(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted:", data);
    if (data.password !== data.confirmPassword) {
      setError("Password is diffrent from Confirm-password");
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      // Removing confirmPassword because the payload type excludes it
      const { confirmPassword, ...rest } = data;
      registerUser(rest);
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
        <StyledLink to={"/authentication/login"}>login</StyledLink>
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
