import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/app/hooks/redux';
import { signOut } from '@/app/store/auth/auth.slice';

type ItemData = {
  action: () => void;
  id: number;
  name: string;
  title: string;
  icon: ReactNode;
};

export default function Settings() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  const DATA: ItemData[] = [
    {
      action: handleLogout,
      id: 0,
      name: 'logout',
      title: 'Logout',
      icon: <Ionicons name="log-out-outline" size={30} color="black" />,
    },
  ];

  const renderItem = ({ item }: { item: ItemData }) => (
    <TouchableOpacity style={styles.flatlistItem} onPress={item.action}>
      {item.icon}
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistItem: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  itemTitle: { marginLeft: 10, fontSize: 18, fontWeight: '500' },
});
