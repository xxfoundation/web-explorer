import { PaletteColorOptions, TypographyStyle } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface Theme {
    borders?: { light?: string };
    boxShadow?: string;
    gradients?: { primary: string };
  }

  interface ThemeOptions {
    borders?: { light?: string }
    boxShadow?: string;
    gradients?: { primary: string };
  }

  interface PaletteOptions {
    veryGood?: PaletteColorOptions;
    good?: PaletteColorOptions;
    neutral?: PaletteColorOptions;
    bad?: PaletteColorOptions;
    veryBad?: PaletteColorOptions;
  }

  interface TypographyVariantsOptions {
    body3?: TypographyStyle;
    body4?: TypographyStyle;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
  }
}

export type { Theme } from '@mui/material';