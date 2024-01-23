import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        display: ['Josefin Sans', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
