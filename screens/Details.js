import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import _ from 'lodash';
// Constants
import { Colors } from '../constants';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  content: {
    padding: 20,
  },
  bold: {
    fontSize: 16,
    fontWeight: '700',
  },
  medium: {
    fontSize: 15,
    fontWeight: '600',
  },
  regular: {
    fontSize: 14,
    fontWeight: '500',
  },
  light: {
    fontSize: 13,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

const getChars = () => {
  const arr = ['a', 'b', 'a', 'c', 'a', 'd'];
  const result = arr.filter((item) => {
    return arr.every((value) => {
      return value.indexOf(item) !== -1;
    });
  });

  return result;
};

const Details = ({}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={Colors.PRIMARYBLUE} />
      <View>
        <Text>1.</Text>
        {getChars()}
      </View>
    </View>
  );
};

export default Details;
