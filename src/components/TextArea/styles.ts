import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,
    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    borderRadius: 8,
    fontFamily: theme.fonts.text400,
    fontSize: 15,
    marginRight: 4,
    padding: 16,
    textAlign: 'justify',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: theme.colors.secondary50
  }
})