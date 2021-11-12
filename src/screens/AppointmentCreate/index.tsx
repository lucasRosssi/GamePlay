import React, { useState } from "react"
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { RectButton } from "react-native-gesture-handler"
import uuid from 'react-native-uuid'
import { useNavigation } from "@react-navigation/core"

import { COLLECTION_APPOINTMENTS } from "../../configs/database"

import { styles } from "./styles"
import { theme } from "../../global/styles/theme"

import { CategorySelect } from "../../components/CategorySelect"
import { Background } from "../../components/Background"
import { SmallInput } from "../../components/SmallInput"
import { TextArea } from "../../components/TextArea"
import { Button } from '../../components/Button'
import { Header } from "../../components/Header"
import { GuildIcon } from "../../components/GuildIcon"
import { ModalView } from "../../components/ModalView"
import { Guilds } from "../Guilds"
import { GuildProps } from "../../components/Guild"
import AsyncStorage from "@react-native-async-storage/async-storage"


export function AppointmentCreate() {
  const [category, setCategory] = useState('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleOpenGuilds() {
    setOpenGuildsModal(true)
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect)
    setOpenGuildsModal(false)
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    function incompleteAppointment() {
      return !(
        newAppointment.category &&
        newAppointment.guild.id && 
        day && 
        month && 
        hour && 
        minute
      )
    }

    function invalidDate() {
      return (
        parseInt(day) > 31 || 
        parseInt(day) == 0 ||
        parseInt(month) > 12 ||
        parseInt(month) == 0 ||
        parseInt(hour) > 23 || 
        parseInt(minute) > 59 ||
        minute.length == 1 ||
        parseInt(month) == 2 && parseInt(day) > 29 ||
        parseInt(month) == 4 && parseInt(day) == 31 ||
        parseInt(month) == 6 && parseInt(day) == 31 ||
        parseInt(month) == 9 && parseInt(day) == 31 ||
        parseInt(month) == 11 && parseInt(day) == 31
      )
    }

    if(incompleteAppointment()) {
      Alert.alert('Preencha todos os dados primeiro')
    } else if(invalidDate()) {
      Alert.alert('Data ou horário inválidos')
    } else {

      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
      const appointments = storage ? JSON.parse(storage) : []

      await AsyncStorage.setItem(
        COLLECTION_APPOINTMENTS,
        JSON.stringify([...appointments, newAppointment])
      )
      
      navigation.navigate('Home')
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header 
            title="Agendar partida"
          />

          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon ? 
                  <GuildIcon guildId={guild.id} iconId={guild.icon} /> : 
                  <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather 
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.textLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" 
                onPress={handleSave}
              />
            </View>
          </View>
        </Background>
      </ScrollView>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds} barVisible>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  )
}