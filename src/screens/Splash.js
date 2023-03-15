import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{'Welcome'}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
