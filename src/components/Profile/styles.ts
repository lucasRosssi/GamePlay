import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    flexDirection: 'row',
  },
  greeting: {
    fontFamily: theme.fonts.title500,
    fontSize: 24,
    color: theme.colors.heading,
    marginRight: 6
  },
  username: {
    fontFamily: theme.fonts.title700,
    fontSize: 24,
    color: theme.colors.heading
  },
  message: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight
  },
  logoutTextBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logoutText: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.title500,
    fontSize: 25,
    paddingTop: 30
  },
  game: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700,
    fontSize: 25,
    paddingTop: 30
  },
  play: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.primary,
    fontSize: 25,
    paddingTop: 30
  },
  buttonsInline: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})