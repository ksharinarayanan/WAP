import { createMuiTheme } from "@material-ui/core/styles";
import "@fontsource/cascadia-code";
import "@fontsource/inter";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7b53c1",
    },
  },
  typography: {
    fontFamily: "cascadia code",
  },
});

export default theme;
