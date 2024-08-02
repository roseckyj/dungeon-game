import { ChakraProvider, DarkMode, extendTheme } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "black",
                color: "white",
            },
        },
    },
    // Add font '"League Spartan", sans-serif' to the theme
    fonts: {
        heading: '"League Spartan", sans-serif',
        body: '"League Spartan", sans-serif',
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={theme}>
        <DarkMode>
            <App />
        </DarkMode>
    </ChakraProvider>
);
