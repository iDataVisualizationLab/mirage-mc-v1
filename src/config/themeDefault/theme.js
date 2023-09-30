// Modified from https://github.com/ed-roh/fullstack-admin/blob/master/client/src/theme.js
// color design tokens export
// export const tokensDark = {
//     grey: {
//         0: "#ffffff", // manually adjusted
//         10: "#f6f6f6", // manually adjusted
//         50: "#f0f0f0", // manually adjusted
//         100: "#e0e0e0",
//         200: "#c2c2c2",
//         300: "#a3a3a3",
//         400: "#858585",
//         500: "#666666",
//         600: "#525252",
//         700: "#3d3d3d",
//         800: "#292929",
//         900: "#141414",
//         1000: "#000000", // manually adjusted
//     },
//     primary: {
//         // blue
//         1000: "#000000",
//         900: "#001b3d",
//         800: "#003062",
//         750: "#003b76",
//         700: "#00468b",
//         650: "#14529a",
//         600: "#275ea7",
//         500: "#4577c1",
//         400: "#6091dd",
//         300: "#7cacfa",
//         200: "#a8c8ff",
//         100: "#d6e3ff",
//         50: "#ecf0ff",
//         20: "#f9f9ff",
//         10: "#fdfbff",
//         0: "#ffffff"
//     },
//     secondary: {
//         // yellow
//         1000: "#000000",
//         900: "#251a00",
//         800: "#3e2e00",
//         750: "#4b3900",
//         700: "#594400",
//         650: "#674f00",
//         600: "#765a00",
//         500: "#947200",
//         400: "#b38b0e",
//         300: "#d0a62e",
//         200: "#eec148",
//         100: "#ffdf95",
//         50: "#ffefd0",
//         20: "#fff8f1",
//         10: "#fffbff",
//         0: "#ffffff"
//     },
// };
export const tokensDark = {
    grey: {
        0: "#ffffff", // manually adjusted
        10: "#f6f6f6", // manually adjusted
        50: "#f0f0f0", // manually adjusted
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
        1000: "#000000", // manually adjusted
    },
    primary: {
        // blue
        100: "#d3d4de",
        200: "#a6a9be",
        300: "#7a7f9d",
        400: "#4d547d",
        500: "#21295c",
        600: "#191F45", // manually adjusted
        700: "#141937",
        800: "#0d1025",
        900: "#070812",
    },
    secondary: {
        // yellow
        50: "#f0f0f0", // manually adjusted
        100: "#fff6e0",
        200: "#ffedc2",
        300: "#ffe3a3",
        400: "#ffda85",
        500: "#ffd166",
        600: "#cca752",
        700: "#997d3d",
        800: "#665429",
        900: "#332a14",
    },
};
// function that reverses the color palette
function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode,fontSize=1) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        ...tokensDark.primary,
                        main: tokensDark.primary[400],
                        light: tokensDark.primary[400],
                    },
                    secondary: {
                        ...tokensDark.secondary,
                        main: tokensDark.secondary[300],
                    },
                    neutral: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.primary[600],
                        alt: tokensDark.primary[500],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.grey[50],
                        light: tokensDark.grey[100],
                    },
                    secondary: {
                        ...tokensLight.secondary,
                        main: tokensDark.secondary[600],
                        light: tokensDark.secondary[700],
                    },
                    neutral: {
                        ...tokensLight.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.grey[0],
                        alt: tokensDark.grey[50],
                    },
                }),
        },
        typography: {
            fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
            fontSize: 12*fontSize,
            h1: {
                fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
                fontSize: 40*fontSize,
            },
            h2: {
                fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
                fontSize: 32*fontSize,
            },
            h3: {
                fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
                fontSize: 24*fontSize,
            },
            h4: {
                fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
                fontSize: 20*fontSize,
            },
            h5: {
                fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
                fontSize: 16*fontSize,
            },
            h6: {
                fontFamily: ["Charis SIL", "Inter", "sans-serif"].join(","),
                fontSize: 14*fontSize,
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    size: 'small',
                    sx: {
                        textTransform: 'none'
                    }
                }
            },
        }
    };
};