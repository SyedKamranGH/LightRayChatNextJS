/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            title: ['Generalsan', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            boxShadow: {
                card: '10px 10px 20px 0px rgba(0, 0, 0, 0.05)',
                header: '3px 3px 3px 0px rgba(0, 0, 0, 0.05)',
            },
            fontFamily: {
                montserrat: 'var(--font-montserrat)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'input-gradient': 'linear-gradient(100deg, #F6FFFE -8.13%, #F7F5FF 107.34%)',
                'input-bar-gradient':
                    'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 30%)',
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    50: '#ebfffd',
                    100: '#074250',
                    300: '#A2FEFF',
                    600: '#E01A22',
                    700: '#DC3534',
                    800: '#126978',
                    900: '#000',
                    950: '#074250',
                },

                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },

                'primary-font': '#6A6A6A',
                sidebar: '#E8E8E8',
                'sidebar-font': '#5D74AD',
                'sys-msg': '#BABABA',
                'main-background': '#E6F1F8',
                success: '#0AB105',
                error: '#C50505',
                'light-error': '#FFE7E7',

                // TEXT COLOURS
                'text-primary': '#000000',
                'text-secondary': '#074250',
                'text-selected': '#03A4B7',
                greyer: '#F3F5F6',
                neutral: {
                    100: '#F5F5F8',
                },
                grey: {
                    100: '#929292',
                    300: '#DCDCDC',
                    400: '#EDEDED',
                    500: '#EFEFEF',
                    700: '#FCFCFC',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeOutDown: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(10px)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeOutLeft: {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                fadeInUp: 'fadeInUp 0.5s ease-out forwards',
                fadeOutDown: 'fadeOutDown 0.5s ease-out forwards',
                // fadeInUp is defined in global.css
                // later, we can decide to move to separate files to improve
                // modularity
                fadeInLeft: 'fadeInLeft 0.5s ease-out forwards',
                fadeOutLeft: 'fadeOutLeft 0.5s ease-out forwards',
                fadeIn: 'fadeIn 0.3s ease-in-out forwards',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@headlessui/tailwindcss')],
    safelist: [
        {
            pattern: /delay-\d+/,
        },
    ],
}
