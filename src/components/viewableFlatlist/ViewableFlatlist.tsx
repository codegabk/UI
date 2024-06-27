import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { FlatList, View, ViewToken } from 'react-native';

import RenderItem from '@/components/viewableFlatlist/renderItem/RenderItem';

import styles from './ViewableFlatlist.styles';

const ItemSeparatorComponent = () => <View style={{ margin: 4 }} />;

const ViewableFlatlist = () => {
  const array = Array.from({ length: 50 }, (_, index) => index);

  const viewableItemsArray = useSharedValue<ViewToken[]>([]);

  const renderItem = ({ item }: { item: number }) => (
    <RenderItem viewableItemsArray={viewableItemsArray} item={item} />
  );

  return (
    <View style={styles.flex}>
      <FlatList
        data={array}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems }) => {
          viewableItemsArray.value = viewableItems;
        }}
        contentContainerStyle={styles.paddingVertical}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default ViewableFlatlist;
