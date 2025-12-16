import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ...

type Item = {
  name: string;
  image: any;
  description: string;
  recommendedPlaces: string[];
};

type RootStackParamList = {
  detail: { item: Item };
  categoryList: { category: string }; // 이미 있다면 생략해도 됨
};

const sampleData = {
    name: 'Tteokbokki',
    image: require('../assets/images/tteokbokki.jpg'),
    description: '떡볶이는 매콤달콤한 소스로 조리한 한국의 대표적인 길거리 음식입니다.',
    recommendedPlaces: ['신당동 떡볶이 골목', '조방낙지', '엽기떡볶이 홍대점']
};

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'detail'>>();
  const { item } = route.params;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    // 실제 앱에서는 AsyncStorage나 DB 저장 로직이 여기에 들어갑니다
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.infoBox}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity onPress={toggleBookmark}>
              <Ionicons
                name={isBookmarked ? 'heart' : 'heart-outline'}
                size={28}
                color={isBookmarked ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          <Text style={styles.subtitle}>📍 추천 맛집</Text>
          <FlatList
            data={item.recommendedPlaces}
            keyExtractor={(place, index) => `${place}-${index}`}
            renderItem={({ item }) => (
              <Text style={styles.placeItem}>• {item}</Text>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16 
  },
  row: { 
    flexDirection: 'row', alignItems: 'flex-start' 
  },
  image: { 
    width: '45%', height: 200, borderRadius: 12
  },
  infoBox: { 
    flex: 1, marginLeft: 16 
  },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  title: { 
    fontSize: 22, fontWeight: 'bold' 
  },
  description: { 
    fontSize: 16, marginTop: 8, marginBottom: 12 
  },
  subtitle: { 
    fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 
  },
  placeItem: { 
    fontSize: 15, marginBottom: 4 
  },
  name: { 
    padding: 8, 
    fontSize: 16, 
    textAlign: 'center' 
  },
});
