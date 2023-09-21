import { extendTheme } from "@chakra-ui/react";
import '@fontsource/rajdhani'
import '@fontsource/raleway'

const theme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Raleway', sans-serif`,
        welcomeTitle: `'Rajdhani', sans-serif`
    }
})

export default theme;