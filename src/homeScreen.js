import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {ItemSections} from '../component/ItemSections';
import {useIsFocused} from '@react-navigation/native';
import Loader from './Loader';

const homeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const openWebview = (url, headerName) => {
    navigation.navigate('openWebview', {
      url: url,
      HeaderName: headerName,
    });
  };
  const [generalData, setGeneralData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = () => {
    setLoading(true);
    fetch('https://iticollege.edu/wp-json/wp/v2/itiapp/27174', {
      method: 'get',
    })
      .then(response => response.json())
      .then(responseJson => {
        const entries = Object.entries(responseJson.acf);
        console.log('Login data.. ', responseJson.acf);
        setGeneralData(null);
        setGeneralData(responseJson.acf);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('', error.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Loader loading={loading} />

      <ImageBackground
        source={{uri: 'asset:/app_bg.jpg'}}
        resizeMode="cover"
        style={styles.image}>
        <View style={{flex: 1, margin: 30, alignItems: 'center'}}>
          <Image source={{uri: 'asset:/logo-icon.png'}} style={styles.logo} />
          <Text
            style={[
              styles.collageName,
              {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: 10,
                padding: 5,
              },
            ]}>
            ITI TECHNICAL COLLEGE
          </Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`tel:${generalData.itiapp_mobile_no}`)
              }
              disabled={generalData == null ? true : false}>
              <View style={{justifyContent: 'center'}}>
                <View style={styles.rowSubContainer}>
                  <Image
                    source={{uri: 'asset:/phone.png'}}
                    resizeMode="center"
                    style={{width: 40, height: 40}}
                  />
                </View>
                <Text
                  style={[
                    styles.collageName,
                    {fontSize: 12, textAlign: 'center', marginTop: 5},
                  ]}>
                  CALL
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `mailto:${generalData.itiapp_email_id}?subject=&body=`,
                )
              }
              disabled={generalData == null ? true : false}>
              <View style={{justifyContent: 'center'}}>
                <View style={styles.rowSubContainer}>
                  <Image
                    source={{uri: 'asset:/email.png'}}
                    resizeMode="center"
                    style={{width: 40, height: 40}}
                  />
                </View>
                <Text
                  style={[
                    styles.collageName,
                    {fontSize: 12, textAlign: 'center', marginTop: 5},
                  ]}>
                  EMAIL
                </Text>
              </View>
            </TouchableOpacity>
            */}
            <TouchableOpacity
              onPress={() =>
                openWebview(
                  'https://iticollege.edu/student-lounge/tech-support/',
                  'Student SUPPORT',
                )
              }>
              <View style={{justifyContent: 'center'}}>
                <View style={[styles.rowSubContainer]}>
                  <Image
                    source={{uri: 'asset:/support.png'}}
                    resizeMode="center"
                    style={{width: 40, height: 40}}
                  />
                </View>
                <Text
                  style={[
                    styles.collageName,
                    {fontSize: 12, textAlign: 'center', marginTop: 5},
                  ]}>
                  STUDENT{'\n'}SUPPORT
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <ItemSections
            name={'Student Lounge'}
            topMargin={40}
            onclick={() =>
              navigation.navigate('studentLounge', {
                HeaderName: 'Student Lounge',
              })
            }
          />
          <ItemSections
            name={'Student Portal'}
            onclick={() =>
              openWebview(
                'https://itistudent.iticollege.edu/Login.aspx',
                'Student Portal',
              )
            }
            image={'student-portal.png'}
          />
          <ItemSections
            name={'Student Holidays'}
            onclick={() =>
              navigation.navigate('studentHolidays', {
                HeaderName: 'Student Holidays',
              })
            }
            image={'student-holiday.png'}
          />
          <ItemSections
            name={'ITI Moodle'}
            onclick={() =>
              openWebview('https://moodle.iticollege.edu/', 'ITI Moodle')
            }
            image={'iti-moodle.png'}
          />
          <ItemSections
            name={'Make a Payment'}
            onclick={() =>
              openWebview(
                'https://iticollege.edu/payment_portal/',
                'Make a Payment',
              )
            }
            image={'make-payment.png'}
          />
          <ItemSections
            name={'Announcements'}
            onclick={() =>
              navigation.navigate('Announcements', {
                HeaderName: 'Announcements',
              })
            }
            image={'announcement.png'}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logo: {
    width: 100,
    height: 100,
  },
  collageName: {
    color: '#fff',
    marginTop: 15,
    fontSize: 25,
    fontWeight: '900',
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 50},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  rowContainer: {
    marginTop: 20,
    width: '40%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSubContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItems: {
    marginTop: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});
