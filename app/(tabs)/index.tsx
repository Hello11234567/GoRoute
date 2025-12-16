// HomeScreen 컴포넌트: 메인화면에서 네이버 지도를 표시하는 기능을 담당

import { View } from 'react-native'; // 기본 View 컴포넌트
import { SafeAreaView } from 'react-native-safe-area-context'; // 노치 및 안전 영역을 고려한 레이아웃을 위한 컴포넌트
import { WebView } from 'react-native-webview'; // HTML/웹 콘텐츠를 렌더링하기 위한 WebView

export default function HomeScreen() {
  // WebView에서 렌더링할 HTML 콘텐츠 (네이버 지도 포함)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          /* 전체 화면을 채우도록 설정 */
          html, body, #map {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
        </style>
        <!-- 네이버 지도 API 로드 (클라이언트 ID는 ncpClientId에 입력) -->
        <script src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=mec6rct1yl"></script>
      </head>
      <body>
        <!-- 지도를 표시할 div 요소 -->
        <div id="map"></div>
        <script>
          // 네이버 지도 초기화
          var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (서울)
            zoom: 10 // 초기 줌 레벨
          });
        </script>
      </body>
    </html>
  `;

  return (
    // 화면 전체를 안전 영역에 맞게 감싸는 뷰
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']} // 외부 콘텐츠 허용
          source={{ html: htmlContent }} // WebView에 HTML 콘텐츠 전달
          javaScriptEnabled={true} // JavaScript 실행 허용
          domStorageEnabled={true} // DOM Storage 허용
        />
      </View>
    </SafeAreaView>
  );
}
