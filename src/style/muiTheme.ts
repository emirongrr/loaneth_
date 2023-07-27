import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Ilisarniq',
  },
  palette: {
    primary: {
      main: '#000000',
    },
  },
  overrides: {
    MuiButton: {
      outlined: {
        paddingTop: '10px',
        paddingBottom: '13px',
      },
      contained: {
        boxShadow: 'none',
      },
      root: {
        '&:focus': { outline: 'none' },
        borderRadius: '5px',
        paddingTop: '10px',
        paddingBottom: '13px',
        boxSizing: 'border-box',
      },
      label: {
        fontSize: '14px',
        lineHeight: '1',
        textTransform: 'none',
      },
    },
  },
});

export default theme;
