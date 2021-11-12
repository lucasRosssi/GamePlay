import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text } from 'react-native'

import { styles } from './styles'

type Props = RectButtonProps & {
  title: string,
  noButton?: boolean,
  yesButton?: boolean
}


export function Button({title, noButton, yesButton, ...rest} : Props) {
  return(
    <RectButton 
      style={noButton ? styles.noButton : styles.container || yesButton ? styles.yesButton : styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  )
}