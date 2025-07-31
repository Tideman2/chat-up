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

declare module "@mui/material/styles" {
  // Final theme type (what's available after theme creation)
  interface Palette {
    link: {
      active: string;
      hover: string;
    };
  }

  // Allowed options during theme creation
  interface PaletteOptions {
    link?: {
      active: string;
      hover: string;
    };
  }
  interface PaletteColorOptions {
    link: {
      active: string;
      hover: string;
    };
  }
}
