import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			/* Foundry Color Primitives */
  			plum: {
  				25: 'var(--plum-25)',
  				50: 'var(--plum-50)',
  				100: 'var(--plum-100)',
  				200: 'var(--plum-200)',
  				300: 'var(--plum-300)',
  				400: 'var(--plum-400)',
  				500: 'var(--plum-500)',
  				600: 'var(--plum-600)',
  				700: 'var(--plum-700)',
  				800: 'var(--plum-800)',
  				900: 'var(--plum-900)',
  			},
  			berry: {
  				50: 'var(--berry-50)',
  				100: 'var(--berry-100)',
  				300: 'var(--berry-300)',
  				400: 'var(--berry-400)',
  				500: 'var(--berry-500)',
  				600: 'var(--berry-600)',
  				700: 'var(--berry-700)',
  			},
  			grass: {
  				25: 'var(--grass-25)',
  				50: 'var(--grass-50)',
  				100: 'var(--grass-100)',
  				300: 'var(--grass-300)',
  				500: 'var(--grass-500)',
  				600: 'var(--grass-600)',
  				700: 'var(--grass-700)',
  			},
  			turquoise: {
  				25: 'var(--turquoise-25)',
  				100: 'var(--turquoise-100)',
  				300: 'var(--turquoise-300)',
  				500: 'var(--turquoise-500)',
  				700: 'var(--turquoise-700)',
  			},
  			tomato: {
  				25: 'var(--tomato-25)',
  				50: 'var(--tomato-50)',
  				100: 'var(--tomato-100)',
  				300: 'var(--tomato-300)',
  				500: 'var(--tomato-500)',
  				700: 'var(--tomato-700)',
  			},
  			orange: {
  				25: 'var(--orange-25)',
  				50: 'var(--orange-50)',
  				100: 'var(--orange-100)',
  				500: 'var(--orange-500)',
  				600: 'var(--orange-600)',
  				700: 'var(--orange-700)',
  			},
  			lemon: {
  				100: 'var(--lemon-100)',
  				500: 'var(--lemon-500)',
  			},
  			sky: {
  				50: 'var(--sky-50)',
  				100: 'var(--sky-100)',
  				500: 'var(--sky-500)',
  			},
  			cool: {
  				300: 'var(--cool-300)',
  				400: 'var(--cool-400)',
  				500: 'var(--cool-500)',
  				600: 'var(--cool-600)',
  				700: 'var(--cool-700)',
  				800: 'var(--cool-800)',
  				900: 'var(--cool-900)',
  			},
  			neutral: {
  				25: 'var(--neutral-25)',
  				50: 'var(--neutral-50)',
  				100: 'var(--neutral-100)',
  				200: 'var(--neutral-200)',
  				300: 'var(--neutral-300)',
  				500: 'var(--neutral-500)',
  				700: 'var(--neutral-700)',
  			},
  		},
  		borderRadius: {
  			xl: '1rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'elevation-rest': 'var(--elevation-rest)',
  			'elevation-raised': 'var(--elevation-raised)',
  			'elevation-hover': 'var(--elevation-hover)',
  			'elevation-overlay': 'var(--elevation-overlay)',
  			'elevation-sticky': 'var(--elevation-sticky)',
  		},
  		fontSize: {
  			'h1': ['40px', { lineHeight: '48px', fontWeight: '700' }],
  			'h2': ['36px', { lineHeight: '44px', fontWeight: '700' }],
  			'h3': ['32px', { lineHeight: '40px', fontWeight: '700' }],
  			'h4': ['28px', { lineHeight: '36px', fontWeight: '700' }],
  			'h5': ['24px', { lineHeight: '32px', fontWeight: '700' }],
  			'h6': ['16px', { lineHeight: '24px', fontWeight: '600' }],
  			'body1': ['18px', { lineHeight: '28px', fontWeight: '400' }],
  			'body2': ['16px', { lineHeight: '24px', fontWeight: '400' }],
  			'body3': ['14px', { lineHeight: '20px', fontWeight: '400' }],
  			'label': ['12px', { lineHeight: '16px', fontWeight: '500' }],
  			'caption': ['10px', { lineHeight: '14px', fontWeight: '400' }],
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'slide-in-right': {
  				'0%': { transform: 'translateX(100%)', opacity: '0' },
  				'100%': { transform: 'translateX(0)', opacity: '1' }
  			},
  			'slide-out-right': {
  				'0%': { transform: 'translateX(0)', opacity: '1' },
  				'100%': { transform: 'translateX(100%)', opacity: '0' }
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'slide-in-right': 'slide-in-right 0.3s ease-out',
  			'slide-out-right': 'slide-out-right 0.3s ease-out',
  		},
  		fontFamily: {
  			sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  		},
  		transitionDuration: {
  			DEFAULT: '200ms',
  		},
  		transitionTimingFunction: {
  			DEFAULT: 'ease-out',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
