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
} from 'react-native';
import Icon from './Icon';
import {useIsFocused} from '@react-navigation/native';
import Loader from './Loader';

const Item = ({title, date}) => (
  <View style={styles.item}>
    <View
      style={{
        flex: 1.8,
        height: 50,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
      }}>
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: '700',
        }}>
        {title}
      </Text>
    </View>
    <View
      style={{
        flex: 3,
        height: 50,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
        }}>
        {date}
      </Text>
    </View>
  </View>
);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'MLK',
    date: 'January 17, 2022',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aeed5-3ad53abb28ba',
    title: 'Mardi Gras',
    date: 'March 01, 2022',
  },
  {
    id: 'bd7acbea-c1b1-4e6c2-aeed5-3ad53abb28ba',
    title: 'Memorial Day',
    date: 'May 30, 2022	',
  },
  {
    id: 'bd7acbea-c1b1-46qc2-aeed5-3ad53abeb28ba',
    title: 'Summer Break',
    date: 'July 01, 2022 – July 11, 2022',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aeed5-3ad5q3abb28ba',
    title: 'Labor Day',
    date: 'September 05, 2022',
  },
];

const studentHolidays = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [studentHolidays, setStudentHolidays] = useState(null);

  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = () => {
    setLoading(true);
    fetch('https://iticollege.edu/wp-json/wp/v2/itiapp/27211', {
      method: 'get',
    })
      .then(response => response.json())
      .then(responseJson => {
        const entries = Object.entries(responseJson.acf);
        console.log('Login data.. holydays ', responseJson.acf);

        setStudentHolidays(null);
        setStudentHolidays(responseJson.acf);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('', error.message);
      });
  };

  const renderItem = ({item}) => <Item title={item.title} date={item.date} />;

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

      {studentHolidays != null && (
        <Text
          style={{
            margin: 10,
            fontSize: 15,
            fontWeight: '500',
            color: '#000',
          }}>
          {studentHolidays.student_holiday_description}
        </Text>
      )}
      {studentHolidays != null && (
        // <FlatList
        //   data={DATA}
        //   renderItem={renderItem}
        //   keyExtractor={item => item.id}
        //   ListHeaderComponent={() => (
        // <View
        //   style={{
        //     height: 60,
        //     backgroundColor: 'rgba(127,141,157,1)',
        //     paddingLeft: 10,
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //   }}>
        //   <Text
        //     style={{
        //       marginLeft: 10,
        //       fontSize: 18,
        //       fontWeight: '500',
        //       color: '#fff',
        //     }}>
        //     {studentHolidays.student_holiday_heading}
        //   </Text>
        // </View>
        //   )}
        // />
        <ScrollView>
          <View
            style={{
              height: 60,
              backgroundColor: 'rgba(127,141,157,1)',
              paddingLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontWeight: '500',
                color: '#fff',
              }}>
              {studentHolidays.student_holiday_heading}
            </Text>
          </View>
          {studentHolidays.student_holiday_1 != null &&
            studentHolidays.student_holiday_1.holiday_title != null &&
            studentHolidays.student_holiday_1.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_1.holiday_title}
                date={studentHolidays.student_holiday_1.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_2 != null &&
            studentHolidays.student_holiday_2.holiday_title != null &&
            studentHolidays.student_holiday_2.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_2.holiday_title}
                date={studentHolidays.student_holiday_2.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_3 != null &&
            studentHolidays.student_holiday_3.holiday_title != null &&
            studentHolidays.student_holiday_3.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_3.holiday_title}
                date={studentHolidays.student_holiday_3.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_4 != null &&
            studentHolidays.student_holiday_4.holiday_title != null &&
            studentHolidays.student_holiday_4.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_4.holiday_title}
                date={studentHolidays.student_holiday_4.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_5 != null &&
            studentHolidays.student_holiday_5.holiday_title != null &&
            studentHolidays.student_holiday_5.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_5.holiday_title}
                date={studentHolidays.student_holiday_5.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_6 != null &&
            studentHolidays.student_holiday_6.holiday_title != null &&
            studentHolidays.student_holiday_6.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_6.holiday_title}
                date={studentHolidays.student_holiday_6.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_7 != null &&
            studentHolidays.student_holiday_7.holiday_title != null &&
            studentHolidays.student_holiday_7.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_7.holiday_title}
                date={studentHolidays.student_holiday_7.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_8 != null &&
            studentHolidays.student_holiday_8.holiday_title != null &&
            studentHolidays.student_holiday_8.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_8.holiday_title}
                date={studentHolidays.student_holiday_8.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_9 != null &&
            studentHolidays.student_holiday_9.holiday_title != null &&
            studentHolidays.student_holiday_9.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_9.holiday_title}
                date={studentHolidays.student_holiday_9.holiday_date}
              />
            )}
          {studentHolidays.student_holiday_10 != null &&
            studentHolidays.student_holiday_10.holiday_title != null &&
            studentHolidays.student_holiday_10.holiday_title != '' && (
              <Item
                title={studentHolidays.student_holiday_10.holiday_title}
                date={studentHolidays.student_holiday_10.holiday_date}
              />
            )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 0.7,
  },
  title: {
    fontSize: 32,
  },
});

export default studentHolidays;
