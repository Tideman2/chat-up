// src/theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    textTypo: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    textTypo?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    textTypo: true;
  }
}
