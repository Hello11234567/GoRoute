// 여행지 추천 페이지 컴포넌트

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// 네비게이션을 위한 Stack 파라미터 타입 정의
type RootStackParamList = {
  see: { category: string, items: { name: string, image: any }[] };
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'see'>;

// 카테고리 목록 (이모지 + 이름)
const categories = [
  { icon: '🍽️', name: 'Food' },
  { icon: '🛍️', name: 'Shopping' },
  { icon: '🏯', name: 'Culture' },
  { icon: '🍸', name: 'Night' },
  { icon: '🎯', name: 'Recommend' },
];

// 카테고리별 여행지 샘플 데이터 (이름과 이미지)
const sampleData = {
  'Food': [
    { name: 'Tteokbokki', image: require('../../assets/images/tteokbokki.jpg') },
    { name: 'Vegetarian Restaurant', image: require('../../assets/images/plant.jpg') },
    { name: 'Korean Barbeque', image: require('../../assets/images/bbq.jpg') },
    { name: 'Bulgogi', image: require('../../assets/images/bulgogi.jpg') }
  ],
  'Shopping': [
    { name: 'Myeongdong', image: require('../../assets/images/myeongdong.jpg') },
    { name: 'Hongdae', image: require('../../assets/images/hongdae.jpg') },
    { name: 'Star Field', image: require('../../assets/images/starfield.jpg') },
    { name: 'Dongdaemun', image: require('../../assets/images/dongdaemun.jpg') }
  ],
  'Culture': [
    { name: 'Gyeongbokgung Palace', image: require('../../assets/images/village.jpg') },
    { name: 'Korean Folk Village', image: require('../../assets/images/myeongdong.jpg') },
    { name: 'taekwondo', image: require('../../assets/images/taekwondo.jpg') },
    { name: 'Daehakro', image: require('../../assets/images/daehakro.jpg') }
  ],
  'Night': [
    { name: 'N Seoul Tower', image: require('../../assets/images/tower.jpg') },
    { name: 'Yeongwol', image: require('../../assets/images/yeongwol.jpg') },
    { name: 'Buyeo', image: require('../../assets/images/buyeo.jpg') },
    { name: 'Daejeon', image: require('../../assets/images/daejeon.jpg') }
  ],
  'Recommend': [
    { name: 'Lotte World', image: require('../../assets/images/lotte.jpg') },
    { name: 'JeJu', image: require('../../assets/images/jeju.jpg') },
    { name: 'Busan', image: require('../../assets/images/busan.jpg') },
    { name: 'Yeosu', image: require('../../assets/images/yeosu.jpg') }
  ],
};

export default function TabTwoScreen() {
  // 각 섹션의 참조 (스크롤 이동용)
  const foodRef = useRef<View>(null);
  const shoppingRef = useRef<View>(null);
  const cultureRef = useRef<View>(null);
  const nightRef = useRef<View>(null);
  const recommendRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp>();

  // 섹션 이름과 ref를 매핑
  const sectionRefs = {
    'Food': foodRef,
    'Shopping': shoppingRef,
    'Culture': cultureRef,
    'Night': nightRef,
    'Recommend': recommendRef,
  };

  const insets = useSafeAreaInsets(); // 안전영역(insets)을 고려한 여백 설정

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 전체 페이지 스크롤 뷰 */}
      <ScrollView
        style={styles.container}
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 10 }} // 하단 여백 추가 (탭바 대비)
      >
        {/* 카테고리 버튼 리스트 */}
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              style={styles.categoryButton}
              onPress={() => {
                // 선택한 카테고리 섹션으로 스크롤 이동
                const ref = sectionRefs[cat.name as keyof typeof sectionRefs];
                if (ref?.current && scrollRef.current) {
                  ref.current.measure((x, y, width, height, pageX, pageY) => {
                    scrollRef.current?.scrollTo({ y: pageY, animated: true });
                  });
                }
              }}
            >
              <Text style={styles.categoryText}>{cat.icon}</Text>
              <Text style={styles.categoryLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 각 카테고리 섹션별 여행지 미리보기 리스트 */}
        {Object.entries(sampleData).map(([sectionTitle, items]) => (
          <View
            key={sectionTitle}
            style={styles.section}
            ref={sectionRefs[sectionTitle as keyof typeof sectionRefs]}
          >
            {/* 섹션 상단: 제목 + "See All" 버튼 */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('see', { category: sectionTitle, items })}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            {/* 섹션 내부: 가로 스크롤 카드 목록 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {items.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardText}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
  },
  categoryText: {
    fontSize: 28,
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#007aff',
  },
  card: {
    width: 120,
    height: 100,
    marginRight: 12,
    backgroundColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: 70,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    padding: 4,
    textAlign: 'center',
    fontSize: 12,
  },
});
