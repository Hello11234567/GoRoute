// 마이페이지 화면 구현

import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

// 즐겨찾기 예시 데이터 (임시 하드코딩)
const favoriteItems = [
  { name: 'Tteokbokki', image: require('../../assets/images/tteokbokki.jpg') },
  { name: 'Myeongdong', image: require('../../assets/images/myeongdong.jpg') },
  { name: 'Lotte World', image: require('../../assets/images/lotte.jpg') },
];

export default function MyPageScreen() {
  // 프로필 수정 버튼 클릭 시 호출되는 함수
  const handleEditProfile = () => {
    Alert.alert('프로필 수정 기능은 준비 중입니다.');
  };

  // 로그아웃 버튼 클릭 시 호출되는 함수 (확인 알림 포함)
  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => console.log('로그아웃 처리') },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 프로필 사진 */}
      <Image
        source={require('../../assets/images/profile.png')}
        style={styles.profileImage}
      />

      {/* 사용자 이름 및 이메일 표시 */}
      <Text style={styles.name}>홍길동</Text>
      <Text style={styles.email}>gildong@example.com</Text>

      {/* 프로필 수정 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>프로필 수정</Text>
      </TouchableOpacity>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      {/* 즐겨찾기 목록 헤더 */}
      <Text style={styles.sectionTitle}>⭐ 즐겨찾기</Text>

      {/* 즐겨찾기 아이템 가로 리스트 */}
      <FlatList
        data={favoriteItems} // 즐겨찾기 데이터 배열
        keyExtractor={(item) => item.name} // 각 아이템을 구분하는 key
        horizontal // 가로 스크롤
        showsHorizontalScrollIndicator={false} // 스크롤바 숨김
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Image source={item.image} style={styles.favoriteImage} />
            <Text style={styles.favoriteName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // 상단 여백
    paddingHorizontal: 20, // 좌우 여백
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // 원형 프로필
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A90E2', // 파란색 버튼
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#E94E4E', // 빨간색 로그아웃 버튼
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  favoriteItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  favoriteImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  favoriteName: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
});
