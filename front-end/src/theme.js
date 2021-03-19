import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7b53c1",
        },
    },
    typography: {
        // TODO: Check if Cascadia code is available in MAC
        fontFamily: ["cascadia code"].join(","),
    },
});

export default theme;
