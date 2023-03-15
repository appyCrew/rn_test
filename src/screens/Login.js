import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addUser} from '../services/addUserService';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as icons from './../constants/iconConstants';
const format = /[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;

const Login = props => {
  const [value, setValue] = useState('');
  const [disabled, setdisabled] = useState(false);

  const onContinue = () => {
    try {
      Keyboard.dismiss();
      if (format.test(value) == false) {
        if (value.length > 3) {
          props.addUser({
            id: new Date().getTime(),
            value: value,
          });
          props.navigation.navigate('OTP', {value: value});
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
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={false}
        contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.15}} />
            <View style={{flex: 0.85, paddingHorizontal: 20}}>
              <Text style={styles.title}>{'Get Started'}</Text>
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
                  onChangeText={txt => {
                    setValue(txt);
                    setdisabled(false);
                  }}
                  onFocus={() => {
                    setdisabled(false);
                  }}
                  autoCorrect={false}
                  numberOfLines={1}
                  inputMode={'email'}
                  caretHidden={false}
                  style={{paddingHorizontal: 10}}
                  keyboardType={'email-address'}
                  placeholder="Mobile/Email"
                />
              </View>
              {disabled ? (
                <Text style={{color: 'red', fontSize: 12}}>
                  {'Enter a valid input'}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={() => onContinue()}
                activeOpacity={0.8}
                disabled={disabled}
                style={[styles.button, {opacity: disabled ? 0.4 : 1}]}>
                <Text style={styles.btnTxt}>{'Continue'}</Text>
                <Image
                  source={icons.RIGHT_ARROW}
                  style={[
                    styles.socialImg,
                    {tintColor: '#fff', marginLeft: 10},
                  ]}
                />
              </TouchableOpacity>
              <View style={styles.cntView}>
                <Text style={styles.cntTxt}>{'Or Continue with'}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                  paddingBottom: 25,
                }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.whatView}>
                  <Image source={icons.WHATSAPP} style={styles.socialImg} />
                  <Text style={styles.whatTxt}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.gleView}>
                  <Image source={icons.GOOGLE} style={styles.socialImg} />
                  <Text style={styles.gleTxt}>Google</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.cntTxt}>
                  {'By Continuing, you agree to our '}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.termTxt}>{'terms'}</Text>
                </TouchableOpacity>
                <Text>{' and '}</Text>
                <TouchableOpacity>
                  <Text style={styles.termTxt}>{'policies'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

function mapStateToProps(state, props) {
  return {
    login: state.login_redux,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({addUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#20A9EA',
    borderColor: '#20A9EA',
    borderWidth: 0.3,
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cntTxt: {
    color: '#252525',
    fontSize: 14,
    opacity: 0.6,
  },
  termTxt: {
    color: '#20A9EA',
    fontSize: 14,
    opacity: 0.6,
  },
  cntView: {
    marginTop: 20,
    marginBottom: 10,
  },
  whatTxt: {
    color: '#4DBC25',
    fontSize: 14,
    opacity: 0.6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whatView: {
    flexDirection: 'row',
    flex: 0.45,
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#4DBC25',
  },
  gleTxt: {
    color: '#2BA6E1',
    fontSize: 14,
    opacity: 0.6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gleView: {
    flex: 0.45,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#2BA6E1',
  },
  socialImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
});
