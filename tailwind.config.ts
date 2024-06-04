import type { Config } from 'tailwindcss';

export default {
    content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [],
} satisfies Config;
