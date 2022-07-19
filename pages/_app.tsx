import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "34em",
  md: "60em",
  lg: "76.8em",
  xl: "144em",
};

const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        fontFamily: "FuturaHandwritten",
        letterSpacing: "5px",
        fontWeight: "500",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "MatSaleh",
        fontWeight: "500",
      },
      sizes: {
        lg: {
          letterSpacing: "0.5px",
        },
      },
      defaultProps: {
        size: "lg",
      },
    },
    FormLabel: {
      baseStyle: {
        fontFamily: "MatSaleh",
        letterSpacing: "0.5px",
      },
    },
    Button: {
      baseStyle: {
        fontFamily: "MatSaleh",
        letterSpacing: "1px",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
