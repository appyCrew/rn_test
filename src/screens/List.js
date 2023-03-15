import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editUser, deleteUser} from '../services/addUserService';
import * as icons from './../constants/iconConstants';
const format = /[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;

const List = props => {
  const [value, setValue] = useState('');
  const [disabled, setdisabled] = useState(false);

  const renderUsers = ({item, index}) => {
    return (
      <View
        removeClippedSubviews={false}
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View
          style={{
            flex: 0.7,
            backgroundColor: '#fff',
            borderColor: disabled ? 'red' : 'grey',
            borderWidth: 0.3,
            borderRadius: 5,
          }}>
          <TextInput
            removeClippedSubviews={false}
            onChangeText={txt => {
              props.editUser({value: txt, id: item.id});
            }}
            autoCorrect={false}
            numberOfLines={1}
            inputMode={'email'}
            placeholderTextColor={'grey'}
            caretHidden={false}
            value={item.value}
            style={{paddingHorizontal: 10, color: '#252525', fontSize: 14}}
            keyboardType={'email-address'}
            placeholder="Mobile/Email"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            props.deleteUser(item.id);
          }}
          style={{
            flex: 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: 'grey',
            backgroundColor: '#EE6F6F',
            flexDirection: 'row',
          }}>
          <Image
            source={icons.DELETE}
            style={[styles.socialImg, {tintColor: '#fff'}]}
          />
          <Text style={styles.cntTxt}>{'Delete'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: '#252525',
            opacity: 0.8,
          }}>
          {'No Records Found'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        scrollEnabled={false}
        contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.15,
                paddingHorizontal: 20,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
                }}
                style={{paddingVertical: 20, flexDirection: 'row'}}>
                <Text style={{color: '#252525', paddingRight: 10}}>
                  {'Logoff'}
                </Text>
                <Image source={icons.LOGOFF} style={[styles.socialImg]} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.85, paddingHorizontal: 20}}>
              <View style={{paddingBottom: 20}}>
                <Text style={styles.title}>{'Mobile/Email List'}</Text>
              </View>
              {/* Changes needed in the Flatlist to render millions of users can be handled by using onLoadmore while wokring with api's, 
            For local data below functionaliy will fetch records smoothly */}
              <FlatList
                removeClippedSubviews={false}
                data={props.login.usersList}
                showsVerticalScrollIndicator={false}
                renderItem={renderUsers}
                ListEmptyComponent={emptyComponent}
              />
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({editUser, deleteUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);

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
  cntTxt: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  socialImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
});
