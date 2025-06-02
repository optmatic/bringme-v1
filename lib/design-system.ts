// Design System Configuration
// Centralized styling configuration for the Bring Me Insight publication

// Type definitions
// ----------------
type HeadingLevel = "h1" | "h2" | "h3";
type HeadingSize = "sm" | "md" | "lg" | "base";
type BackgroundStyle = "gradient" | "flora-fauna" | "solid";

interface HeadingStyles {
  background: string;
  border: string;
  display: string;
  font: string;
}
interface BackgroundConfig {
  className: string;
  overlay: any;
}
interface TextColorConfig {
  primary: string;
  secondary: string;
  badge: string;
  icon: string;
}

export const designSystem = {
  // Color Palette
  colors: {
    primary: {
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
      },
    },
    text: {
      primary: "#020617", // Changed to slate-950 for even darker text
      secondary: "#1e293b", // Changed to slate-800 for darker secondary text
      muted: "#475569", // Changed to slate-600 for darker muted text
      light: "#64748b", // Changed to slate-500 for darker light text
    },
    background: {
      primary: "#ffffff",
      secondary: "#f9fafb", // gray-50
      accent: "#f0fdf4", // green-50
    },
    borders: {
      subtle: "border-gray-200/60", // Subtle brutalist borders
      light: "border-gray-100/80",
      accent: "border-green-200/50",
    },
  },

  // Typography
  typography: {
    fonts: {
      logo: ["Bokor", "cursive"],
      heading: ["Gothic A1", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
    sizes: {
      // Article content
      body: {
        sm: "text-sm", // 14px
        base: "text-base", // 16px
        lg: "text-lg", // 18px
      },
      // Headings
      h1: {
        sm: "text-2xl", // 24px
        md: "text-3xl", // 30px
        lg: "text-4xl", // 36px
      },
      h2: {
        base: "text-3xl", // 30px
      },
      h3: {
        base: "text-xl", // 20px
      },
    },
    lineHeight: {
      tight: "leading-tight", // 1.25
      snug: "leading-snug", // 1.375
      normal: "leading-normal", // 1.5
      relaxed: "leading-relaxed", // 1.625
      loose: "leading-loose", // 2
    },
  },

  // Spacing
  spacing: {
    headings: {
      h2: {
        marginTop: "mt-8", // Reduced from mt-12 to mt-8
        marginBottom: "mb-5", // Reduced from mb-6 to mb-5
        padding: "px-6 py-2", // Reduced vertical padding from py-3 to py-2
      },
      h3: {
        marginTop: "mt-6", // Reduced from mt-10 to mt-6
        marginBottom: "mb-4", // Reduced from mb-5 to mb-4
        padding: "px-3 py-1.5", // Reduced vertical padding from py-2 to py-1.5
      },
    },
    sections: {
      gap: "space-y-6", // Reduced from space-y-8 to space-y-6
    },
    paragraphs: {
      gap: "mb-5", // Reduced from mb-6 to mb-5
    },
    featured: {
      titleGap: "mb-6", // Reduced from mb-8 to mb-6
      contentGap: "space-y-8", // Reduced from space-y-10 to space-y-8
    },
    article: {
      padding: "p-6 lg:p-8", // Reduced from p-8 lg:p-10 to p-6 lg:p-8
    },
  },

  // Component Styles
  components: {
    // Heading backgrounds
    headings: {
      h1: {
        background: "",
        border: "",
        display: "inline-block",
        font: "font-black font-gothic",
      },
      h2: {
        background: "bg-gradient-to-r from-green-100/60 to-green-50/20",
        border: "", // No rounded corners - straight edges
        display: "inline-block",
        font: "font-black font-gothic", // Changed from font-bold to font-black
      },
      h3: {
        background: "bg-gradient-to-r from-lime-100/40 to-lime-50/20",
        border: "", // No rounded corners - straight edges
        display: "inline-block",
        font: "font-bold font-gothic", // Changed from font-semibold to font-bold
      },
    },

    // Links
    links: {
      inline: {
        color: "text-green-600",
        decoration: "underline decoration-green-400 decoration-2",
        hover: "hover:text-green-700 hover:decoration-green-500",
        transition: "transition-colors duration-200",
      },
    },

    // Badges
    badges: {
      category:
        "bg-gradient-to-r from-green-100 via-lime-50 to-green-100 text-green-800 border border-green-200/60",
      tag: "bg-white text-green-800 border border-green-200/60",
    },

    // Cards - Brutalist straight edges with subtle borders
    cards: {
      article: "bg-white shadow-sm border border-gray-200/60", // Straight edges, subtle border
      sidebar:
        "bg-white/95 backdrop-blur-sm shadow-sm border border-gray-200/50", // Straight edges, subtle border
      header: "bg-white shadow-sm border border-gray-100/80", // Straight edges, subtle border
    },

    // Article Info Bar Configuration
    articleInfoBar: {
      // Background style options: 'gradient' | 'flora-fauna' | 'solid'
      backgroundStyle: "flora-fauna" as BackgroundStyle,

      // Background configurations
      backgrounds: {
        gradient: {
          className: "bg-gradient-to-r from-green-400 to-lime-300",
          overlay: null,
        },
        "flora-fauna": {
          className: "bg-white",
          overlay: {
            backgroundImage: "url('/images/australian-flora-fauna-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15, // Slightly higher opacity for better visibility
          },
        },
        solid: {
          className: "bg-green-500",
          overlay: null,
        },
      } as Record<BackgroundStyle, BackgroundConfig>,

      // Text colors for different backgrounds
      textColors: {
        gradient: {
          primary: "text-white",
          secondary: "text-white/90",
          badge: "bg-white/20 text-white border-white/30",
          icon: "bg-white/20",
        },
        "flora-fauna": {
          primary: "text-slate-800",
          secondary: "text-slate-600",
          badge: "bg-green-100 text-green-800 border-green-200/60",
          icon: "bg-green-100",
        },
        solid: {
          primary: "text-white",
          secondary: "text-white/90",
          badge: "bg-white/20 text-white border-white/30",
          icon: "bg-white/20",
        },
      } as Record<BackgroundStyle, TextColorConfig>,
    },
  },

  // Effects
  effects: {
    shadows: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "",
    },
    transitions: {
      default: "transition-all duration-200",
      slow: "transition-all duration-300",
      fast: "transition-all duration-150",
    },
  },
};

// Helper function to get design system values
export const ds = designSystem;

// Utility functions for common combinations
export const getHeadingClasses = (level: HeadingLevel, size?: HeadingSize) => {
  const baseClasses = ds.components.headings[level];
  if (level === "h1") {
    const sizeClass = size
      ? ds.typography.sizes.h1[size as "sm" | "md" | "lg"]
      : ds.typography.sizes.h1.lg;
    return `${sizeClass} ${baseClasses?.font || "font-black font-gothic"}`; // Changed from font-bold to font-black
  }
  return Object.values(baseClasses || {}).join(" ");
};

export const getLinkClasses = () => {
  const linkStyles = ds.components.links.inline;
  return Object.values(linkStyles).join(" ");
};

// Helper function to get article info bar styling
export const getArticleInfoBarStyles = () => {
  const config = ds.components.articleInfoBar;
  const currentStyle = config.backgroundStyle as BackgroundStyle;
  const background = config.backgrounds[currentStyle];
  const textColors = config.textColors[currentStyle];

  return {
    background,
    textColors,
    currentStyle,
  };
};
