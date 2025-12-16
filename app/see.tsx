// 카테고리 목록 화면 - 선택한 카테고리에 따라 해당 항목들을 보여주는 화면

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


// 1. 타입 정의

// 개별 항목의 타입 정의
type Item = {
    name: string;
    image: any; // 실제 프로젝트에서는 require된 이미지 타입 지정 권장
};

// 카테고리 타입 (사용자 선택 기준)
type Category = 'Food' | 'Shopping' | 'Culture' | 'Night' | 'Recommend';

// 라우트 파라미터 타입 정의
type CategoryParamList = {
    see: { category: Category };     // 리스트 보기용
    detail: { item: Item };          // 상세 보기용
};

// 내비게이션 타입 정의
type NavigationProp = StackNavigationProp<CategoryParamList, 'see'>;


// 2. 카테고리별 샘플 데이터 (이미지 포함)
const sampleData = {
  'Food': [
    { name: 'Tteokbokki', image: require('../assets/images/tteokbokki.jpg') },
    { name: 'Vegetarian Restaurant', image: require('../assets/images/plant.jpg') },
    { name: 'Korean Barbeque', image: require('../assets/images/bbq.jpg') },
    { name: 'Bulgogi', image: require('../assets/images/bulgogi.jpg') }
  ],
  'Shopping': [
    { name: 'Myeongdong', image: require('../assets/images/myeongdong.jpg') },
    { name: 'Hongdae', image: require('../assets/images/hongdae.jpg') },
    { name: 'Star Field', image: require('../assets/images/starfield.jpg') },
    { name: 'Dongdaemun', image: require('../assets/images/dongdaemun.jpg') }
  ],
  'Culture': [
    { name: 'Gyeongbokgung Palace', image: require('../assets/images/village.jpg') },
    { name: 'Korean Folk Village', image: require('../assets/images/myeongdong.jpg') },
    { name: 'taekwondo', image: require('../assets/images/taekwondo.jpg') },
    { name: 'Daehakro', image: require('../assets/images/daehakro.jpg') }
  ],
  'Night': [
    { name: 'N Seoul Tower', image: require('../assets/images/tower.jpg') },
    { name: 'Yeongwol', image: require('../assets/images/yeongwol.jpg') },
    { name: 'Buyeo', image: require('../assets/images/buyeo.jpg') },
    { name: 'Daejeon', image: require('../assets/images/daejeon.jpg')}
  ],
  'Recommend': [
    { name: 'Lotte World', image: require('../assets/images/lotte.jpg') },
    { name: 'JeJu', image: require('../assets/images/jeju.jpg') },
    { name: 'Busan', image: require('../assets/images/busan.jpg') }, 
    { name: 'Yeosu', image: require('../assets/images/yeosu.jpg') }
  ],
};

// 3. 타입 안정성을 위한 sampleData 형변환 (mutablesampleData 사용)
const mutablesampleData: Record<Category, Item[]> = sampleData;


// 4. 컴포넌트 구현부
export default function CategoryListScreen() {
  // 현재 route와 navigation 객체 가져오기
  const route = useRoute<RouteProp<CategoryParamList, 'see'>>();
  const navigation = useNavigation<StackNavigationProp<CategoryParamList, 'see'>>();

  // 현재 선택된 category 추출
  const { category } = route.params;

  // 해당 카테고리에 속한 아이템 목록 불러오기
  const items: Item[] = mutablesampleData[category];

  return (
    <View style={styles.container}>
      {/* 카테고리 제목 출력 */}
      <Text style={styles.title}>{category} Spots</Text>

      {/* 아이템 목록 렌더링 */}
      <FlatList 
        data={items} 
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate('detail', { item })}
          >
            {/* 항목 이미지 */}
            <Image source={item.image} style={styles.image} />
            {/* 항목 이름 */}
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


// 5. 스타일 정의
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  item: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  image: { 
    width: '100%', 
    height: 150 
  },
  name: { 
    padding: 8, 
    fontSize: 16, 
    textAlign: 'center' 
  },
});
