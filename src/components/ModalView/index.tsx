import React, { ReactNode } from 'react'
import { View, Modal, ModalProps, TouchableWithoutFeedback } from 'react-native'
import { Background } from '../Background'

import { styles } from './styles'

type Props = ModalProps & {
  children: ReactNode,
  closeModal?: () => void,
  barVisible?: boolean,
  logout?: boolean
}

export function ModalView({
  children,
  closeModal,
  barVisible,
  logout,
  ...rest
}: Props) {
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={closeModal}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={logout ? styles.logout :styles.container}>
            <Background>
              <View style={barVisible ? styles.bar : {}}/>
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}