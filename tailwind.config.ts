
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for Kalmar Studio - updated for purple theme
				'kalmar': {
					50: 'hsl(var(--kalmar-50))',
					100: 'hsl(var(--kalmar-100))',
					200: 'hsl(var(--kalmar-200))',
					300: 'hsl(var(--kalmar-300))',
					400: 'hsl(var(--kalmar-400))',
					500: 'hsl(var(--kalmar-500))',
					600: 'hsl(var(--kalmar-600))',
					700: 'hsl(var(--kalmar-700))',
					800: 'hsl(var(--kalmar-800))',
					900: 'hsl(var(--kalmar-900))',
					950: 'hsl(var(--kalmar-950))',
				},
				// New orange accent colors
				'orange': {
					50: 'hsl(var(--orange-50))',
					100: 'hsl(var(--orange-100))',
					200: 'hsl(var(--orange-200))',
					300: 'hsl(var(--orange-300))',
					400: 'hsl(var(--orange-400))',
					500: 'hsl(var(--orange-500))',
					600: 'hsl(var(--orange-600))',
					700: 'hsl(var(--orange-700))',
					800: 'hsl(var(--orange-800))',
					900: 'hsl(var(--orange-900))',
					950: 'hsl(var(--orange-950))',
				},
				'purple': {
					50: '#f5f0ff',
					100: '#ede5ff',
					200: '#dfd0ff',
					300: '#c9adff',
					400: '#ac7dff',
					500: '#9b59ff',
					600: '#8530f9',
					700: '#7422e6',
					800: '#6122c5',
					900: '#521aa1',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(5px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'blur-in': 'blur-in 0.6s ease-out'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'width': 'width'
			},
			fontFamily: {
				sans: ['Inter var', 'Inter', 'sans-serif'],
				display: ['SF Pro Display', 'Inter var', 'sans-serif']
			},
			boxShadow: {
				'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.05)',
				'purple': '0 4px 14px 0 rgba(155, 89, 255, 0.39)',
				'orange': '0 4px 14px 0 rgba(245, 158, 11, 0.39)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			backgroundImage: {
				'gradient-purple-orange': 'linear-gradient(135deg, #9b59ff 0%, #ff9e5e 100%)',
				'gradient-orange-purple': 'linear-gradient(135deg, #ff9e5e 0%, #9b59ff 100%)',
				'gradient-soft-purple': 'linear-gradient(180deg, #f5f0ff 0%, #ffffff 100%)',
				'gradient-soft-orange': 'linear-gradient(180deg, #fff4ea 0%, #ffffff 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
