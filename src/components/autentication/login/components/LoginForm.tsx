import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../components/Input";
import StyledLink from "../../components/StyledLink";
import useAuth from "../../../../hooks/useAuth";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  // Access the client
  const queryClient = useQueryClient();
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
      console.log(data);
      // Store token in localStorage and set tokenExpiration time
      const now = Date.now();
      const tokenExpirationTime = now + 1800 * 1000;
      localStorage.setItem(
        "tokenExpiresIn",
        JSON.stringify(tokenExpirationTime)
      );
      localStorage.setItem("accessToken", data["access-token"]);

      // prepare user data and add to query and context for now.
      let { id: userId, username: name, email } = data["user-info"];
      let userCredentials = { userId, name, email };
      queryClient.setQueryData(["currentUser"], userCredentials);
      if (setUser) {
        setUser(userCredentials);
      }
      // redirect user to app
      navigate("/app");
    },
    [navigate, setUser]
  );

  //re-writing to use react query
  const onSubmit: SubmitHandler<FormData> = (formData) => {
    createUserMutate.mutate(formData);
  };

  //login and add users key to query keys
  const createUserMutate = useMutation({
    mutationFn: async (userData: FormData) => {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      handleLoginSuccess(data); // ← data from mutation comes here
    },
    onError: (error) => {
      console.error("Login error:", error);
      setError(error.message);
    },
  });

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
          {createUserMutate.isPending ? "logging" : "log in"}
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
