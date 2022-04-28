import { TypographyStyle } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface Theme {
    borders?: { light?: string };
    boxShadow?: string;
    gradients?: { primary: string, secondary: string };
  }

  interface ThemeOptions {
    borders?: { light?: string }
    boxShadow?: string;
    gradients?: { primary: string, secondary: string };
  }

  interface TypographyVariantsOptions {
    body3?: TypographyStyle;
    body4?: TypographyStyle;
    body5?: TypographyStyle;
    subheader4?: TypographyStyle;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    body5: true;
    subheader4: true;
  }
}

export type { Theme } from '@mui/material';
