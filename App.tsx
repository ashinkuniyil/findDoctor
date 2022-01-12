import React from 'react';
import { StyleSheet, Linking, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, IconRegistry, Modal, Text, Card, Icon, Input, Button, Select, SelectItem, IndexPath, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NameSearchScreen from './screen/name-search';
import RegNumberSearchScreen from './screen/reg-no-search';
import AdvanceSearchScreen from './screen/advance-search';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Name' />
    <BottomNavigationTab title='Reg Number' />
    <BottomNavigationTab title='Advance' />
  </BottomNavigation>
);

const HeaderIcon = () => {
  const [visible, setVisible] = React.useState(false);
  const styles = StyleSheet.create({
    container: {
      minHeight: 192,
      width: '80%',
      flex: 1
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    link: {
      color: 'blue',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
  return (
    <>
      <Icon
        style={{
          width: 24,
          height: 24,
          marginRight: 10
        }}
        fill="#0645AD"
        name='info-outline'
        onPress={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        style={styles.container}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={styles.card}>
          <Text style={{ textAlign: 'center' }} category="h5">DEVELOPER</Text>
          <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}><Text style={{ fontWeight: 'bold' }}>ashin</Text>kuniyil<Text style={{ color: '#f45338', fontWeight: 'bold' }}>.</Text></Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.link}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/ashink/')}>
              LinkedIn</Text><Text> | </Text>
            <Text style={styles.link}
              onPress={() => Linking.openURL('https://contra.com/ashinkuniyil')}>
              Contra</Text><Text> | </Text>
            <Text style={styles.link}
              onPress={() => Linking.openURL('http://ashin.kuniyil.me/')}>
              Personal</Text>
          </View>
          <Button style={{ marginTop: 15 }} onPress={() => setVisible(false)}>
            <Text>Close</Text>
          </Button>
        </Card>
      </Modal>
    </>)
};

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Name' component={NameSearchScreen} options={{
      title: 'Find Doctor : NMC', headerRight: () => (
        <HeaderIcon></HeaderIcon>
      )
    }} />
    <Screen name='RegNumber' component={RegNumberSearchScreen} options={{
      title: 'Find Doctor : NMC', headerRight: () => (
        <HeaderIcon></HeaderIcon>
      )
    }} />
    <Screen name='Advance' component={AdvanceSearchScreen} options={{
      title: 'Find Doctor : NMC', headerRight: () => (
        <HeaderIcon></HeaderIcon>
      )
    }} />
  </Navigator>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  </>
);