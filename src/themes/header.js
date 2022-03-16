

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            ...(mode === "light"
                ? {
                    main: "#00A2D6",
                    contrastText: "##9A9A9A",
                }
                : {
                    main: "#FFFFFF",
                    contrastText: "#FFFFFF",
                }),
        },
        background: {
            default: "#E5E5E5",
            transparent: "rgba(255,255,255,0.24)",
        },
    },
    gradient: {
        ...(mode === "light"
            ? {
                primary: "transparent",
            }
            : 
            {
                primary: "linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)",
            }),
    },
    borders: {
        light: "1px solid #EAEAEA",
    },
});