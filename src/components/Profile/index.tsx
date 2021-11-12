import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useAuth } from '../../hooks/auth'

import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { ModalView } from '../ModalView'
import { styles } from './styles'

export function Profile() {
  const [openSignOutModal, setOpenSignOutModal] = useState(false)
  const { user, signOut } = useAuth()


  function openSignOut() {
    setOpenSignOutModal(true)
  }

  function closeSignOut() {
    setOpenSignOutModal(false)
  }

  return (
    <>
      <View style={styles.container}>
        <RectButton onPress={openSignOut}>
          <Avatar urlImage={user.avatar} />
        </RectButton>
        <View>
          <View style={styles.user}>
            <Text style={styles.greeting}>
              Olá,
            </Text>
            <Text style={styles.username}>
              {user.firstName}
            </Text>
          </View>

          <Text style={styles.message}>
            Hoje é dia de vitória
          </Text>
        </View>

      </View>
      <ModalView visible={openSignOutModal} logout>
        <View style={styles.logoutTextBox}>
          <Text style={styles.logoutText}> 
            Deseja sair do
          <Text style={styles.game}> Game</Text><Text style={styles.play}>Play</Text>
          <Text style={styles.logoutText}>?</Text> 
          </Text>
        </View>
        <View style={styles.buttonsInline}>
          <Pressable onPress={closeSignOut}>
            <Button title="Não" noButton onPress={closeSignOut} />
          </Pressable>
          <Pressable onPress={signOut}>
            <Button title="Sim" yesButton onPress={signOut} />
          </Pressable>
        </View>
      </ModalView>
    </>
  )
}