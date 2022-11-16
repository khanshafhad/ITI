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
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Icon from './Icon';
import {useIsFocused} from '@react-navigation/native';
import Loader from './Loader';
import {SegmentComponent} from './SegmentComponent';
import HTMLView from 'react-native-htmlview';

const Announcements = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [studentAnnouncements, setStudentAnnouncements] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState('ANNOUNCEMENTS');

  const [loading, setLoading] = useState(false);

  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = () => {
    setLoading(true);
    fetch('https://iticollege.edu/wp-json/wp/v2/itiapp/27251', {
      method: 'get',
    })
      .then(response => response.json())
      .then(responseJson => {
        const entries = Object.entries(responseJson.acf);
        setStudentAnnouncements(null);
        setStudentAnnouncements(responseJson.acf);
        console.log('responseJson.acf fetchData', responseJson.acf);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('', error.message);
      });
  };

  return (
    <>
      <Loader loading={loading} />
      <View
        style={{
          height: 60,
          backgroundColor: 'rgba(43,61,144,1)',
          paddingLeft: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onBack}>
          <Icon
            icon={Platform.OS == 'ios' ? 'BackArrowiOS' : 'BackArrow'}
            color="#fff"
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontWeight: '500',
            color: '#fff',
          }}>
          {route.params.HeaderName}
        </Text>
      </View>
      <SegmentComponent
        width={'100%'}
        for_allUser={true}
        onClickSegmentChanged={value => {
          setSelectedSegment(value);
        }}
        style={{position: 'relative'}}
        badgesValue={[0, 0]}
        segment_Value={['ANNOUNCEMENTS', 'UPCOMING EVENTS']}
      />
      {studentAnnouncements != null && selectedSegment == 'ANNOUNCEMENTS' && (
        <ScrollView style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: 'asset:/logo-icon.png'}}
              style={{width: 50, height: 50, margin: 20}}
            />
            <HTMLView
              style={{marginRight: 120}}
              value={studentAnnouncements.announcement_1}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: 'asset:/logo-icon.png'}}
              style={{width: 50, height: 50, margin: 20}}
            />
            <HTMLView
              style={{marginRight: 120}}
              value={studentAnnouncements.announcement_2}
            />
          </View>
        </ScrollView>
      )}

      {studentAnnouncements != null && selectedSegment != 'ANNOUNCEMENTS' && (
        <>
          <View style={{flexDirection: 'row', margin: 20, height: '10%'}}>
            <View
              style={{
                flex: 2,
                backgroundColor: 'rgba(43,61,144,1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 1,
                }}>
                {studentAnnouncements.iti_event_1.event_date.split(' ')[0]}
              </Text>

              <Text
                style={{
                  color: '#fff',
                  borderBottomColor: '#fff',
                }}>
                {studentAnnouncements.iti_event_1.event_date.split(' ')[1]}
              </Text>
            </View>
            <View
              style={{
                flex: 6,
                backgroundColor: '#ccc',
                padding: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  fontWeight: '500',
                }}>
                {studentAnnouncements.iti_event_1.event_title}
              </Text>
              <Text
                style={{
                  color: '#ccq',
                  fontSize: 12,
                  paddingTop: 5,
                  //   fontWeight:'500',
                }}>
                {studentAnnouncements.iti_event_1.event_sub_title}
              </Text>
            </View>
          </View>

          {studentAnnouncements.iti_event_2 != null &&
            studentAnnouncements.iti_event_2.event_date != null &&
            studentAnnouncements.iti_event_2.event_date != '' && (
              <View style={{flexDirection: 'row', margin: 20, height: '10%'}}>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: 'rgba(43,61,144,1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      borderBottomColor: '#fff',
                      borderBottomWidth: 1,
                    }}>
                    {studentAnnouncements.iti_event_2.event_date.split(' ')[0]}
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      borderBottomColor: '#fff',
                    }}>
                    {studentAnnouncements.iti_event_2.event_date.split(' ')[1]}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 6,
                    backgroundColor: '#ccc',
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontWeight: '500',
                    }}>
                    {studentAnnouncements.iti_event_2.event_title}
                  </Text>
                  <Text
                    style={{
                      color: '#ccq',
                      fontSize: 12,
                      paddingTop: 5,
                      //   fontWeight:'500',
                    }}>
                    {studentAnnouncements.iti_event_2.event_sub_title}
                  </Text>
                </View>
              </View>
            )}
          {studentAnnouncements.iti_event_3 != null &&
            studentAnnouncements.iti_event_3.event_date != null &&
            studentAnnouncements.iti_event_3.event_date != '' && (
              <View style={{flexDirection: 'row', margin: 20, height: '10%'}}>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: 'rgba(43,61,144,1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      borderBottomColor: '#fff',
                      borderBottomWidth: 1,
                    }}>
                    {studentAnnouncements.iti_event_3.event_date.split(' ')[0]}
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      borderBottomColor: '#fff',
                    }}>
                    {studentAnnouncements.iti_event_3.event_date.split(' ')[1]}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 6,
                    backgroundColor: '#ccc',
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontWeight: '500',
                    }}>
                    {studentAnnouncements.iti_event_3.event_title}
                  </Text>
                  <Text
                    style={{
                      color: '#ccq',
                      fontSize: 12,
                      paddingTop: 5,
                      //   fontWeight:'500',
                    }}>
                    {studentAnnouncements.iti_event_3.event_sub_title}
                  </Text>
                </View>
              </View>
            )}
          {studentAnnouncements.iti_event_4 != null &&
            studentAnnouncements.iti_event_4.event_date != null &&
            studentAnnouncements.iti_event_4.event_date != '' && (
              <View style={{flexDirection: 'row', margin: 20, height: '10%'}}>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: 'rgba(43,61,144,1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      borderBottomColor: '#fff',
                      borderBottomWidth: 1,
                    }}>
                    {studentAnnouncements.iti_event_4.event_date.split(' ')[0]}
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      borderBottomColor: '#fff',
                    }}>
                    {studentAnnouncements.iti_event_4.event_date.split(' ')[1]}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 6,
                    backgroundColor: '#ccc',
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontWeight: '500',
                    }}>
                    {studentAnnouncements.iti_event_4.event_title}
                  </Text>
                  <Text
                    style={{
                      color: '#ccq',
                      fontSize: 12,
                      paddingTop: 5,
                      //   fontWeight:'500',
                    }}>
                    {studentAnnouncements.iti_event_4.event_sub_title}
                  </Text>
                </View>
              </View>
            )}
        </>
      )}
    </>
  );
};

export default Announcements;
