import React , {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from './Icon';
import Loader from './Loader';

const openWebview = ({navigation,route}) => {
  const [loading, setLoading] = useState(false);

    const onBack = () => {
        navigation.goBack();
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
      <WebView
              // onLoadStart={() => console.log(
              //   "WebView onLoadStart"
              // )}
              onLoadProgress={() =>{ route.params.HeaderName != 'ITI Moodle' && setLoading(true)}}
onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        source={{
          uri: route.params.url,
        }}
        style={{
          backgroundColor: '#F6F6F6',
          flex: 1,
        }}
      />
    </>
  );
};

export default openWebview;
