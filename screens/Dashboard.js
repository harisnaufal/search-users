import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
// Actions
import { getUserList, resetList } from '../store/actions/dashboard';
// Constants
import { Colors, Sizing } from '../constants';

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
  imgContainer: {
    width: 90,
    height: 90,
  },
  img: {
    height: null,
    width: null,
    resizeMode: 'cover',
    flex: 1,
  },
});

const initialParams = {
  q: 'harisnaufal',
};

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [params, setParams] = useState(initialParams);
  const { lists, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    resetList(dispatch);
  }, []);

  useEffect(() => {
    getUserList(dispatch, params);
  }, [params]);

  const onChangeText = async (value) => {
    setParams((oldParams) => ({
      q: value,
    }));
    await resetList(dispatch);
  };

  const renderSearchBar = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={(val) => onChangeText(val)}
          value={params.q || ''}
          placeholder='Search'
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <UserCard item={item} />;
        }}
        ListFooterComponent={() => {
          if (loading) {
            return <ActivityIndicator size='large' />;
          }
          return <View />;
        }}
        ListEmptyComponent={() => {
          if (!loading) {
            return (
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.regular}>Search User</Text>
              </View>
            );
          }
          return <View />;
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={Colors.PRIMARYBLUE} />
      <View style={styles.content}>{renderSearchBar()}</View>
      <View>{renderContent()}</View>
    </View>
  );
};

export default Dashboard;

const UserCard = ({ item }) => {
  return (
    <View style={[styles.row, { marginBottom: 10, paddingHorizontal: 20 }]}>
      <View style={[styles.imgContainer, { marginRight: 20 }]}>
        <Image style={styles.img} source={{ uri: item.avatar_url }} />
      </View>
      <View style={styles.column}>
        <Text
          style={[styles.bold, { color: Colors.DARKGREY, marginBottom: 3 }]}
        >
          {item.login}
        </Text>
        <Text
          style={[styles.regular, { color: Colors.DARKGREY, marginBottom: 5 }]}
        >
          {item.id}
        </Text>
        <Text style={[styles.medium, { color: Colors.BLUE }]}>{item.url}</Text>
      </View>
    </View>
  );
};
