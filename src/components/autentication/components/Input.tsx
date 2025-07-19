import {
  Control,
  FieldErrors,
  RegisterOptions,
  Controller,
  Path,
} from "react-hook-form";
import { TextField, InputAdornment, styled, Typography } from "@mui/material";
import { useState } from "react";

interface InputProps<T extends Record<string, any>> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  rules?: RegisterOptions<T, Path<T>>;
  type?: string;
  label: string;
  [key: string]: any;
}

let AdornmentText = styled(Typography)(() => {
  return {
    textTransform: "none",
    width: 35,
    height: 20,
    fontWeight: 600,
    fontSize: 13,
  };
});

export default function Input<T extends Record<string, any>>(
  props: InputProps<T>
) {
  let [showPassword, setShowPassword] = useState(false);

  const { name, control, errors, rules, type, defaultValue, label, ...rest } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        ...rules,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin="normal"
          value={field.value ?? ""}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          type={showPassword ? `text` : type}
          {...rest}
          slotProps={{
            ...rest.slotProps,
            input: {
              endAdornment:
                type === `password` ? (
                  <InputAdornment position="end">
                    <AdornmentText
                      onClick={() => setShowPassword(!showPassword)}
                      variant="subtitle1" // Prevent uppercase text
                    >
                      {showPassword ? "Hide" : "Show"}
                    </AdornmentText>
                  </InputAdornment>
                ) : null,
              ...rest.slotProps?.input,
            },
          }}
        />
      )}
    />
  );
}
