import { Platform } from "react-native";

const theme = {
  colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBarBackgroundColor: '#ADD8E6',
      error: "#DC143C",
    },
  fontSizes: {
      body: 14,
      subheading: 16,
      appBarFontSize: 20,
    },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    })
      //main: 'System',
    },
  fontWeights: {
      normal: '400',
      bold: '700',
    },
  
  };
  
  export default theme;