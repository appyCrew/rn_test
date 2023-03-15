import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as icons from './../constants/iconConstants';

const OTP = props => {
  const [value, setValue] = useState('');
  const [disabled, setdisabled] = useState(false);

  const onChangeTxt = txt => {
    try {
      setValue(txt);
      if (txt.length >= 4) {
        if (txt == 9999) {
          setdisabled(false);
          props.navigation.reset({
            index: 0,
            routes: [{name: 'List'}],
          });
        } else {
          setdisabled(true);
        }
      } else {
        setdisabled(true);
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
                style={{paddingVertical: 10}}>
                <Image source={icons.BACK} style={[styles.socialImg]} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.85, paddingHorizontal: 20}}>
              <View style={{paddingBottom: 20}}>
                <Text style={styles.title}>{'Enter OTP'}</Text>
                <Text style={styles.cntTxt}>
                  {'We have sent a One Time Password (OTP) to '}
                  {props.route.params.value}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderColor: disabled ? 'red' : 'grey',
                  borderWidth: 0.3,
                  borderRadius: 5,
                  marginVertical: 10,
                }}>
                <TextInput
                  value={value}
                  onChangeText={onChangeTxt}
                  onFocus={() => {
                    setdisabled(false);
                  }}
                  onSubmitEditing={() => {
                    onChangeTxt(value);
                  }}
                  autoCorrect={false}
                  numberOfLines={1}
                  maxLength={4}
                  inputMode={'numeric'}
                  caretHidden={false}
                  style={{paddingHorizontal: 10}}
                  keyboardType={'number-pad'}
                  placeholder="OTP"
                />
              </View>
              {disabled ? (
                <Text style={{color: 'red', fontSize: 12}}>
                  {'Enter a valid OTP'}
                </Text>
              ) : null}
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Text style={styles.cntTxt}>{'Resend OTP in 00:15'}</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingBottom: 5,
  },
  cntTxt: {
    color: '#252525',
    fontSize: 14,
    opacity: 0.6,
  },
  socialImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
});
