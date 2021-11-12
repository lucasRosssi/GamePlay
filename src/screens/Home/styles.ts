import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26,
    marginBottom: 42
  },
  matches: {
    marginTop: 24,
    marginLeft: 24
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