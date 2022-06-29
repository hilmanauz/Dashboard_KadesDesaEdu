import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "FuturaHandwritten",
        fontSize: "25px",
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
          fontSize: "36px",
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
