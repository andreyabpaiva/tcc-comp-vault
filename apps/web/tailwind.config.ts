import type { Config } from "tailwindcss";

/**
 * Tokens extraídos do design (Portal de TCCs UFPA.dc.html — Claude Design).
 * Paleta minimalista pastel, fonte Roboto.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#EFEDE8", // fundo da página (off-white quente)
        surface: "#F6F4EF", // superfície / áreas internas
        ink: {
          DEFAULT: "#1C1A18", // texto principal
          soft: "#4A4440", // texto de corpo (resumo)
          muted: "#6A6460", // texto secundário
          faint: "#9A938B", // texto apagado
          ghost: "#B8B0A8", // ícones apagados
        },
        line: {
          DEFAULT: "#E6E2DC", // borda padrão
          soft: "#F0EDE8", // divisores
          input: "#E0DCD7", // borda de inputs
        },
        // Azul primário (curso Ciência da Computação)
        primary: {
          DEFAULT: "#4F8FD0",
          hover: "#3F7FC0",
          tint: "#ECF4FC",
          ring: "#C9DDF2",
        },
        // Verde (curso Sistema de Informação)
        si: {
          DEFAULT: "#3E9D6E",
        },
        // Vermelho (estado de erro)
        danger: {
          DEFAULT: "#C85151",
          tint: "#FCF0F0",
          ring: "#F2C9C9",
        },
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        panel: "14px",
        detail: "16px",
        field: "9px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-480px 0" },
          "100%": { backgroundPosition: "480px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.3s infinite linear",
        "fade-up": "fade-up 0.3s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
