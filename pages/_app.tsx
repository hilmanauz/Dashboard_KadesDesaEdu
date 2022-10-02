import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
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
        letterSpacing: "0.5px",
        fontWeight: "500",
      },
      sizes: {
        lg: {
          fontSize: "40px",
        },
        md: {
          fontSize: "30px",
        },
        sm: {
          fontSize: "25px",
        },
        xs: {
          fontSize: "20px",
        },
      },
      defaultProps: {
        size: "lg",
      },
    },
    Text: {
      sizes: {
        lg: {
          fontSize: "24px",
        },
        md: {
          fontSize: "20px",
        },
        sm: {
          fontSize: "14px",
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
