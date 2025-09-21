import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			xs: '475px'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			primary: {
  				'100': '#EAD8B0',
  				color1: '#A1AA8A',
  				color2: '#666461',
  				hover: '#838C6E',
  				color3: '#FFFFFF',
  				color4: '#E0E0E0',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			darkMod: {
  				'100': '#666461',
  				'200': '#5A5A58',
  				'300': '#4E4E4C',
  				'400': '#424240',
  				'500': '#363634',
  				'600': '#2A2A28',
  				'700': '#1E1E1C',
  				DEFAULT: '#666461'
  			},
  			tertiary: '#E2C675',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			black: {
  				'100': '#666461',
  				'200': '#4E4E4C',
  				'300': '#BABABA',
  				DEFAULT: '#000000'
  			},
  			white: {
  				'100': '#FFD7D4',
  				DEFAULT: '#FFFFFF'
  			},
  			sidebar: {
  				DEFAULT: '#F7F7F7',
  				foreground: '#666461',
  				primary: '#838C6E',
  				'primary-foreground': '#FFFFFF',
  				accent: '#E2C675',
  				'accent-foreground': '#666461',
  				border: '#E0E0E0',
  				ring: '#838C6E'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			zain: [
  				'var(--font-zain)'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			],
  			sans: [
  				'var(--font-noto-kufi-arabic)',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'100': '2px 2px 0px 0px rgb(0, 0, 0)',
  			'200': '2px 2px 0px 2px rgb(0, 0, 0)',
  			'300': '2px 2px 0px 2px #DB9F9A'
  		},
  		animation: {
  			'bounce-x': 'bouncex 1s infinite',
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
  		},
  		keyframes: {
  			bouncex: {
  				'0%, 100%': {
  					transform: 'translateX(-25%)',
  					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': {
  					transform: 'translateY(0)',
  					animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  				}
  			},
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			}
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--${key}`, value])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
