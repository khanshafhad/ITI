import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
  Switch,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Loader from './Loader';
import Icon from './Icon';
import {useIsFocused} from '@react-navigation/native';
// import PDFView from 'react-native-view-pdf';
// import Pdf from 'react-native-pdf';
import HTMLView from 'react-native-htmlview';

const Item = ({zeroIndex, firstIndex}) => (
  <View style={styles.item}>
    <ImageBackground
      source={{uri: `asset:/${mapping[zeroIndex]}`}}
      style={{flex: 1, aspectRatio: 1}}
      resizeMode="contain"
    />
  </View>
);

const Student_debt_relief = ({zeroIndex, firstIndex, clickToOpen}) => (
  <View style={styles.item}>
    {console.log('firstIndex... ', firstIndex)}
    <ImageBackground
      source={{uri: `asset:/${mapping[zeroIndex]}`}}
      resizeMode="contain"
      style={styles.image}>
      <Text style={styles.text}>{firstIndex.content_1}</Text>
      <TouchableOpacity onPress={() => clickToOpen(firstIndex.button_url_1)}>
        <View
          style={{
            height: 30,
            width: 100,
            borderColor: 'rgba(7,70,156,1.0)',
            borderWidth: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: 'rgba(7,70,156,1.0)',
              fontWeight: '600',
            }}>
            CLICK HERE
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.text}>{firstIndex.content_2}</Text>
      <TouchableOpacity onPress={() => clickToOpen(firstIndex.button_url_2)}>
        <View
          style={{
            height: 30,
            width: 100,
            borderColor: 'rgba(7,70,156,1.0)',
            borderWidth: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: 'rgba(7,70,156,1.0)',
              fontWeight: '600',
            }}>
            CLICK HERE
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

const Like_us_on_facebook = ({zeroIndex, firstIndex, clickToOpen}) => (
  // <TouchableOpacity onPress={() => clickToOpen(firstIndex.button_url_1)}>
  <View style={styles.item}>
    <ImageBackground
      source={{uri: `asset:/${mapping[zeroIndex]}`}}
      style={{flex: 1, aspectRatio: 1}}
      resizeMode="contain"
    />
  </View>
  // </TouchableOpacity>
);

const Attention_all_veterans = ({zeroIndex, firstIndex, clickToOpen}) => (
  <TouchableOpacity onPress={() => clickToOpen(firstIndex.veteran_url)}>
    <View style={styles.item}>
      <ImageBackground
        source={{uri: `asset:/${mapping[zeroIndex]}`}}
        style={{flex: 1, aspectRatio: 1}}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);

const Class_schedule = ({zeroIndex, firstIndex, clickToOpen}) => (
  <TouchableOpacity
    onPress={() => clickToOpen(firstIndex.class_schedule_pdf_url)}>
    {console.log('firstIndex Class_schedule', Class_schedule)}
    <View style={styles.item}>
      <ImageBackground
        source={{uri: `asset:/${mapping[zeroIndex]}`}}
        style={{flex: 1, aspectRatio: 1}}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);

const Need_help = ({zeroIndex, firstIndex, clickToOpen}) => (
  <View style={styles.item}>
    {console.log('firstIndex... Need_help', firstIndex)}
    <ImageBackground
      source={{uri: `asset:/${mapping[zeroIndex]}`}}
      style={[styles.image, {minHeight: 450, minWidth: '100%'}]}
      resizeMode="contain">
      <View style={{height: 450, minWidth: '90%',alignItems:'center'}}>
        <HTMLView
          style={{marginTop:50,height:200,width:240}}
          stylesheet={StyleSheet.create({
            a: {
              color: '#fff',
            },
            h3:{
              color: '#fff',
            },
            ul:{
              color: '#fff',
            },
          })}
          textComponentProps={StyleSheet.create({
            color: '#fff'
          })}

          value={firstIndex.need_help_content}
        />
      </View>
    </ImageBackground>
  </View>
);

const Share_your_ride = ({zeroIndex, firstIndex, clickToOpen}) => (
  // <TouchableOpacity onPress={() => clickToOpen(firstIndex.class_schedule_pdf_url)}>
  // {console.log('firstIndex Class_schedule',Class_schedule)}
  <View style={styles.item}>
    <ImageBackground
      source={{uri: `asset:/${mapping[zeroIndex]}`}}
      style={{flex: 1, aspectRatio: 1}}
      resizeMode="contain"
    />
  </View>
  //  </TouchableOpacity>
);

const mapping = {
  student_debt_relief: 'stu-dept.png',
  like_us_on_facebook: 'img-1.png',
  attention_all_veterans: 'images-3-1.png',
  class_schedule: 'fall-2022-new.png',
  need_help: 'new-img-5.png',
  share_your_ride: 'lagniappee.png',
};

const studentLounge = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [studentLoungeData, setStudentLoungeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const source = {
    uri: 'https://iticollege.edu/wp-content/uploads/2022/10/FAL22-Class-Schedule.pdf',
    cache: true,
  };
  const onBack = () => {
    navigation.goBack();
  };

  const openWebview = (url, headerName) => {
    navigation.navigate('openWebview', {
      url: url,
      HeaderName: headerName,
    });
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = () => {
    setLoading(true);
    fetch('https://iticollege.edu/wp-json/wp/v2/itiapp/27180', {
      method: 'get',
    })
      .then(response => response.json())
      .then(responseJson => {
        const entries = Object.entries(responseJson.acf);
        console.log('Login data.. ', responseJson.acf);
        setStudentLoungeData(null);
        setStudentLoungeData(entries);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('', error.message);
      });
  };

  const renderItem = ({item}) => (
    <>
      {item[0] == 'student_debt_relief' && (
        <Student_debt_relief
          zeroIndex={item[0]}
          firstIndex={item[1]}
          clickToOpen={click => openWebview(click, 'Student Debt Relief')}
        />
      )}

      {item[0] == 'like_us_on_facebook' && (
        <Like_us_on_facebook
          zeroIndex={item[0]}
          firstIndex={item[1]}
          clickToOpen={click => openWebview(click, 'Like Us On Facebook')}
        />
      )}

      {item[0] == 'attention_all_veterans' && (
        <Attention_all_veterans
          zeroIndex={item[0]}
          firstIndex={item[1]}
          clickToOpen={click => openWebview(click, 'Attention all veterans')}
        />
      )}

      {item[0] == 'class_schedule' && (
        <Class_schedule
          zeroIndex={item[0]}
          firstIndex={item[1]}
          clickToOpen={click => {
            openWebview(
              'https://docs.google.com/gview?embedded=true&url=' + click,
              'Class schedule',
            );
          }}
        />
      )}

      {item[0] == 'need_help' && (
        <Need_help
          zeroIndex={item[0]}
          firstIndex={item[1]}
          clickToOpen={click => openWebview(click, 'Need help')}
        />
      )}

      {item[0] == 'share_your_ride' && (
        <Share_your_ride
          zeroIndex={item[0]}
          firstIndex={item[1]}
          clickToOpen={click => openWebview(click, 'Share your ride')}
        />
      )}
    </>
  );
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
      <FlatList
        data={studentLoungeData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{backgroundColor: 'rgba(44,58,146,1.0)'}}
      />
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
    minHeight: 450,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 13,
    backgroundColor: 'rgba(7,70,156,1.0)',
    marginTop: 50,
    padding: 15,
    // marginLemarft:10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default studentLounge;
