/**
 * 지도 페이지 컴포넌트
 */

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  BookMarked, 
  Calendar,
  Utensils,
  Hotel,
  Landmark,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Place {
  id: string;
  name: string;
  type: '음식점' | '숙소' | '관광지';
  address: string;
  lat: number;
  lng: number;
}

interface MapPageProps {
  onBack: () => void;
}

export function MapPage({ onBack }: MapPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTripBookOpen, setIsTripBookOpen] = useState(false);
  const [tripBookPlaces, setTripBookPlaces] = useState<Place[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'전체' | '음식점' | '숙소' | '관광지'>('전체');
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markers, setMarkers] = useState<Array<{ marker: any; place: Place }>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchedPlaces, setSearchedPlaces] = useState<Place[]>([]);
  const [currentZoom, setCurrentZoom] = useState(10);
  const tripBookButtonRef = useRef<HTMLButtonElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // 줌 레벨 기준 (9 이상일 때만 마커 표시)
  const MIN_ZOOM_FOR_MARKERS = 9;

  const samplePlaces: Place[] = [
    // 관광지
    { id: '1', name: '수원 화성', type: '관광지', address: '경기도 수원시 팔달구', lat: 37.2866, lng: 127.0151 },
    { id: '2', name: '에버랜드', type: '관광지', address: '경기도 용인시 처인구', lat: 37.2938, lng: 127.2020 },
    { id: '3', name: '파주 프리미엄 아울렛', type: '관광지', address: '경기도 파주시', lat: 37.7795, lng: 126.7006 },
    { id: '5', name: '남한산성', type: '관광지', address: '경기도 광주시 남한산성면', lat: 37.4785, lng: 127.1865 },
    { id: '7', name: '가평 아침고요수목원', type: '관광지', address: '경기도 가평군 상면', lat: 37.7450, lng: 127.3547 },
    { id: '9', name: '쁘띠프랑스', type: '관광지', address: '경기도 가평군 청평면', lat: 37.6848, lng: 127.4316 },
    { id: '10', name: '포천 아트밸리', type: '관광지', address: '경기도 포천시 신북면', lat: 38.0895, lng: 127.3072 },
    { id: '11', name: '허브아일랜드', type: '관광지', address: '경기도 포천시 신북면', lat: 38.0762, lng: 127.3348 },
    { id: '12', name: '용문사', type: '관광지', address: '경기도 양평군 용문면', lat: 37.5498, lng: 127.5743 },
    { id: '13', name: '광명동굴', type: '관광지', address: '경기도 광명시 가학동', lat: 37.4363, lng: 126.8648 },
    { id: '14', name: '제부도', type: '관광지', address: '경기도 화성시 서신면', lat: 37.1883, lng: 126.6298 },
    { id: '15', name: '양평 두물머리', type: '관광지', address: '경기도 양평군 양서면', lat: 37.5502, lng: 127.3105 },
    { id: '16', name: 'DMZ 평화누리공원', type: '관광지', address: '경기도 파주시 문산읍', lat: 37.8893, lng: 126.7395 },
    { id: '17', name: '캐리비안베이', type: '관광지', address: '경기도 용인시 처인구', lat: 37.2979, lng: 127.2025 },
    { id: '18', name: '한국민속촌', type: '관광지', address: '경기도 용인시 기흥구', lat: 37.2597, lng: 127.1191 },
    { id: '19', name: '임진각', type: '관광지', address: '경기도 파주시 문산읍', lat: 37.8894, lng: 126.7448 },
    { id: '20', name: '소나무 캠핑장', type: '관광지', address: '경기도 가평군 북면', lat: 37.8347, lng: 127.4152 },
    { id: '21', name: '애니멀파크', type: '관광지', address: '경기도 용인시 처인구', lat: 37.2856, lng: 127.1956 },
    { id: '22', name: '행주산성', type: '관광지', address: '경기도 고양시 덕양구', lat: 37.5995, lng: 126.8725 },
    { id: '41', name: '오산 물향기수목원', type: '관광지', address: '경기도 오산시 수청동', lat: 37.1564, lng: 127.0447 },
    { id: '42', name: '안산 대부도', type: '관광지', address: '경기도 안산시 단원구', lat: 37.2351, lng: 126.5764 },
    { id: '43', name: '시흥 오이도', type: '관광지', address: '경기도 시흥시 정왕동', lat: 37.3465, lng: 126.6848 },
    { id: '44', name: '김포 애기봉', type: '관광지', address: '경기도 김포시 하성면', lat: 37.6531, lng: 126.5487 },
    { id: '45', name: '동두천 소요산', type: '관광지', address: '경기도 동두천시 상봉암동', lat: 37.9477, lng: 127.0821 },
    { id: '46', name: '연천 재인폭포', type: '관광지', address: '경기도 연천군 연천읍', lat: 38.0963, lng: 127.0742 },
    { id: '47', name: '의정부 회룡문화제', type: '관광지', address: '경기도 의정부시 호원동', lat: 37.7388, lng: 127.0473 },
    { id: '48', name: '남양주 다산 유적지', type: '관광지', address: '경기도 남양주시 조안면', lat: 37.5859, lng: 127.2547 },
    { id: '49', name: '구리 동구릉', type: '관광지', address: '경기도 구리시 인창동', lat: 37.6177, lng: 127.1389 },
    { id: '50', name: '하남 미사경정공원', type: '관광지', address: '경기도 하남시 망월동', lat: 37.5589, lng: 127.1842 },
    { id: '51', name: '성남 판교테크노밸리', type: '관광지', address: '경기도 성남시 분당구', lat: 37.4012, lng: 127.1103 },
    { id: '52', name: '광주 곤지암도자공원', type: '관광지', address: '경기도 광주시 곤지암읍', lat: 37.3452, lng: 127.2785 },
    { id: '53', name: '여주 신륵사', type: '관광지', address: '경기도 여주시 신륵사길', lat: 37.2943, lng: 127.6298 },
    { id: '54', name: '여주 세종대왕릉', type: '관광지', address: '경기도 여주시 능서면', lat: 37.2821, lng: 127.6142 },
    { id: '55', name: '이천 도자예술마을', type: '관광지', address: '경기도 이천시 신둔면', lat: 37.3245, lng: 127.4856 },
    { id: '56', name: '이천 산수유마을', type: '관광지', address: '경기도 이천시 백사면', lat: 37.2135, lng: 127.5347 },
    { id: '57', name: '용인 호암미술관', type: '관광지', address: '경기도 용인시 처인구', lat: 37.2456, lng: 127.1847 },
    { id: '58', name: '용인 와우정사', type: '관광지', address: '경기도 용인시 처인구', lat: 37.2014, lng: 127.2758 },
    { id: '59', name: '안성 칠장사', type: '관광지', address: '경기도 안성시 죽산면', lat: 37.0645, lng: 127.3156 },
    { id: '60', name: '안성 팜랜드', type: '관광지', address: '경기도 안성시 공도읍', lat: 37.0234, lng: 127.1987 },
    { id: '61', name: '평택호 관광단지', type: '관광지', address: '경기도 평택시 현덕면', lat: 36.9567, lng: 126.9854 },
    { id: '62', name: '평택 소사벌문화축제', type: '관광지', address: '경기도 평택시 소사동', lat: 37.0014, lng: 127.0234 },
    { id: '63', name: '화성 융릉', type: '관광지', address: '경기도 화성시 안녕동', lat: 37.2154, lng: 127.0478 },
    { id: '64', name: '화성 우음도', type: '관광지', address: '경기도 화성시 우정읍', lat: 37.1254, lng: 126.6847 },
    { id: '65', name: '오산 독산성', type: '관광지', address: '경기도 오산시 지곶동', lat: 37.1478, lng: 127.0689 },
    { id: '66', name: '안산 별망성지', type: '관광지', address: '경기도 안산시 상록구', lat: 37.3047, lng: 126.8342 },
    { id: '67', name: '시흥 물왕저수지', type: '관광지', address: '경기도 시흥시 과림동', lat: 37.3878, lng: 126.8014 },
    { id: '68', name: '김포 문수산성', type: '관광지', address: '경기도 김포시 월곶면', lat: 37.6145, lng: 126.5698 },
    { id: '69', name: '김포 덕포진', type: '관광지', address: '경기도 김포시 대곶면', lat: 37.7245, lng: 126.5987 },
    { id: '70', name: '고양 벽제관지', type: '관광지', address: '경기도 고양시 덕양구', lat: 37.6879, lng: 126.9547 },
    { id: '71', name: '고양 원당종마목장', type: '관광지', address: '경기도 고양시 덕양구', lat: 37.6547, lng: 126.8765 },
    { id: '72', name: '고양 서오릉', type: '관광지', address: '경기도 고양시 덕양구', lat: 37.6324, lng: 126.8879 },
    { id: '73', name: '파주 헤이리 예술마을', type: '관광지', address: '경기도 파주시 탄현면', lat: 37.7789, lng: 126.7012 },
    { id: '74', name: '파주 통일동산', type: '관광지', address: '경기도 파주시 문산읍', lat: 37.8745, lng: 126.7325 },
    { id: '75', name: '파주 감악산', type: '관광지', address: '경기도 파주시 적성면', lat: 37.9215, lng: 126.9547 },
    { id: '76', name: '양주 장흥자생수목원', type: '관광지', address: '경기도 양주시 장흥면', lat: 37.8745, lng: 127.0965 },
    { id: '77', name: '양주 감악산출렁다리', type: '관광지', address: '경기도 양주시 남면', lat: 37.8598, lng: 126.9847 },
    { id: '78', name: '동두천 자유수호평화박물관', type: '관광지', address: '경기도 동두천시 평화로', lat: 37.9014, lng: 127.0587 },
    { id: '79', name: '연천 고랑포구', type: '관광지', address: '경기도 연천군 미산면', lat: 38.0245, lng: 127.0014 },
    { id: '80', name: '연천 숭의전', type: '관광지', address: '경기도 연천군 미산면', lat: 38.0147, lng: 127.0365 },
    { id: '81', name: '포천 산정호수', type: '관광지', address: '경기도 포천시 영북면', lat: 38.1047, lng: 127.3245 },
    { id: '82', name: '포천 국립수목원', type: '관광지', address: '경기도 포천시 소흘읍', lat: 37.7453, lng: 127.1785 },
    { id: '83', name: '가평 자라섬', type: '관광지', address: '경기도 가평군 가평읍', lat: 37.8314, lng: 127.5102 },
    { id: '84', name: '가평 남이섬', type: '관광지', address: '경기도 가평군 가평읍', lat: 37.7914, lng: 127.5265 },
    { id: '85', name: '가평 청평호', type: '관광지', address: '경기도 가평군 청평면', lat: 37.7358, lng: 127.4365 },
    { id: '86', name: '양평 세미원', type: '관광지', address: '경기도 양평군 양서면', lat: 37.5412, lng: 127.3254 },
    { id: '87', name: '양평 황순원문학촌', type: '관광지', address: '경기도 양평군 서종면', lat: 37.4678, lng: 127.5847 },
    { id: '88', name: '양평 산음자연휴양림', type: '관광지', address: '경기도 양평군 단월면', lat: 37.5687, lng: 127.6547 },
    { id: '89', name: '남양주 운길산', type: '관광지', address: '경기도 남양주시 조안면', lat: 37.6014, lng: 127.3147 },
    { id: '90', name: '남양주 수종사', type: '관광지', address: '경기도 남양주시 조안면', lat: 37.5947, lng: 127.3214 },
    { id: '91', name: '남양주 봉선사', type: '관광지', address: '경기도 남양주시 진접읍', lat: 37.7145, lng: 127.1847 },
    { id: '92', name: '의정부 경민대학교 수목원', type: '관광지', address: '경기도 의정부시 용현동', lat: 37.7547, lng: 127.0247 },
    { id: '93', name: '구리 아차산', type: '관광지', address: '경기도 구리시 아차산로', lat: 37.6014, lng: 127.1014 },
    { id: '94', name: '하남 하사창', type: '관광지', address: '경기도 하남시 하사창동', lat: 37.5447, lng: 127.2014 },
    { id: '95', name: '성남 율동공원', type: '관광지', address: '경기도 성남시 분당구', lat: 37.3654, lng: 127.1214 },
    { id: '96', name: '성남 탄천종합운동장', type: '관광지', address: '경기도 성남시 분당구', lat: 37.4014, lng: 127.1325 },
    { id: '97', name: '광주 팔당호', type: '관광지', address: '경기도 광주시 남종면', lat: 37.5245, lng: 127.2547 },
    { id: '98', name: '광주 경안천습지생태공원', type: '관광지', address: '경기도 광주시 오포읍', lat: 37.3547, lng: 127.2214 },
    { id: '99', name: '여주 영릉', type: '관광지', address: '경기도 여주시 능서면', lat: 37.2914, lng: 127.6247 },
    { id: '100', name: '여주 파사성', type: '관광지', address: '경기도 여주시 대신면', lat: 37.2547, lng: 127.5847 },
    
    // 음식점
    { id: '4', name: '수원 갈비 맛집', type: '음식점', address: '경기도 수원시 영통구', lat: 37.2574, lng: 127.0435 },
    { id: '8', name: '이천 쌀밥집', type: '음식점', address: '경기도 이천시', lat: 37.2719, lng: 127.4350 },
    { id: '23', name: '파주 장단콩 마을', type: '음식점', address: '경기도 파주시 적성면', lat: 37.9418, lng: 126.9223 },
    { id: '24', name: '양평 한우 식당', type: '음식점', address: '경기도 양평군 양평읍', lat: 37.4922, lng: 127.4947 },
    { id: '25', name: '가평 막국수', type: '음식점', address: '경기도 가평군 가평읍', lat: 37.8314, lng: 127.5095 },
    { id: '26', name: '안성 유기농 뷔페', type: '음식점', address: '경기도 안성시', lat: 37.0078, lng: 127.2797 },
    { id: '27', name: '포천 이동갈비', type: '음식점', address: '경기도 포천시 이동면', lat: 38.0152, lng: 127.3898 },
    { id: '28', name: '광주 백숙 맛집', type: '음식점', address: '경기도 광주시 오포읍', lat: 37.3461, lng: 127.2366 },
    { id: '29', name: '평택 추어탕', type: '음식점', address: '경기도 평택시', lat: 37.0004, lng: 127.0865 },
    { id: '30', name: '수원 통닭거리', type: '음식점', address: '경기도 수원시 팔달구', lat: 37.2828, lng: 127.0163 },
    
    // 숙소
    { id: '6', name: '호텔 경기', type: '숙소', address: '경기도 성남시 분당구', lat: 37.3838, lng: 127.1208 },
    { id: '31', name: '가평 레이크사이드 펜션', type: '숙소', address: '경기도 가평군 청평면', lat: 37.7253, lng: 127.4198 },
    { id: '32', name: '포천 힐링 리조트', type: '숙소', address: '경기도 포천시 소흘읍', lat: 37.9542, lng: 127.2145 },
    { id: '33', name: '양평 한옥 스테이', type: '숙소', address: '경기도 양평군 서종면', lat: 37.4332, lng: 127.6124 },
    { id: '34', name: '수원 호텔 팰리스', type: '숙소', address: '경기도 수원시 장안구', lat: 37.3011, lng: 127.0097 },
    { id: '35', name: '용인 에버랜드 호텔', type: '숙소', address: '경기도 용인시 처인구', lat: 37.2931, lng: 127.1993 },
    { id: '36', name: '파주 프로방스 펜션', type: '숙소', address: '경기도 파주시 탄현면', lat: 37.7858, lng: 126.7323 },
    { id: '37', name: '이천 온천 호텔', type: '숙소', address: '경기도 이천시 모가면', lat: 37.2294, lng: 127.3698 },
    { id: '38', name: '남양주 글램핑', type: '숙소', address: '경기도 남양주시 조안면', lat: 37.6845, lng: 127.3254 },
    { id: '39', name: '안성 팜빌 리조트', type: '숙소', address: '경기도 안성시 보개면', lat: 37.0598, lng: 127.1975 },
    { id: '40', name: '화성 바다뷰 펜션', type: '숙소', address: '경기도 화성시 우정읍', lat: 37.1345, lng: 126.7124 },
  ];

  // Leaflet 지도 초기화
  useEffect(() => {
    // Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (mapContainerRef.current && (window as any).L) {
        const L = (window as any).L;
        
        // 경기도 경계 (대략적인 좌표)
        const gyeonggioBounds = L.latLngBounds(
          L.latLng(36.8, 126.4), // 남서쪽 모서리
          L.latLng(38.3, 127.9)  // 북동쪽 모서리
        );
        
        // 지도 초기화 (경기도 중심)
        const map = L.map(mapContainerRef.current, {
          zoomControl: false, // 기본 줌 컨트롤 숨김
          maxBounds: gyeonggioBounds, // 경기도 범위로 제한
          maxBoundsViscosity: 0.5, // 경계를 벗어날 때 저항감
          minZoom: 8, // 최소 줌 레벨
          maxZoom: 18, // 최대 줌 레벨
        }).setView([37.4138, 127.5183], 9); // 경기도 중심, 줌 레벨 9

        // OpenStreetMap 타일 레이어 추가
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(map);



        // 커스텀 마커 아이콘 생성 함수
        const createCustomIcon = (type: string) => {
          const colors: Record<string, string> = {
            '음식점': '#ef4444',
            '숙소': '#3b82f6',
            '관광지': '#10b981',
          };
          
          const iconHtml = `
            <div style="
              background: ${colors[type] || '#10b981'};
              width: 32px;
              height: 32px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 4px 6px rgba(0,0,0,0.2);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                transform: rotate(45deg);
                color: white;
                font-size: 14px;
              ">📍</div>
            </div>
          `;

          return L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });
        };

        // 장소 마커 추가
        const createdMarkers: Array<{ marker: any; place: Place }> = [];
        
        samplePlaces.forEach((place) => {
          const marker = L.marker([place.lat, place.lng], {
            icon: createCustomIcon(place.type),
          }).addTo(map);

          // 팝업 추가
          const popupContent = `
            <div style="padding: 12px; min-width: 220px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${place.name}</h3>
              <p style="margin: 4px 0 8px 0; font-size: 13px;">
                <span style="
                  display: inline-block;
                  padding: 4px 10px;
                  background: ${place.type === '음식점' ? '#fef2f2' : place.type === '숙소' ? '#eff6ff' : '#f0fdf4'};
                  color: ${place.type === '음식점' ? '#ef4444' : place.type === '숙소' ? '#3b82f6' : '#10b981'};
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: 600;
                ">${place.type}</span>
              </p>
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280; line-height: 1.5;">${place.address}</p>
              <button 
                id="add-to-tripbook-${place.id}"
                style="
                  width: 100%;
                  padding: 8px 16px;
                  background: linear-gradient(to right, #10b981, #3b82f6);
                  color: white;
                  border: none;
                  border-radius: 6px;
                  font-size: 13px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s;
                "
                onmouseover="this.style.background='linear-gradient(to right, #059669, #2563eb)'"
                onmouseout="this.style.background='linear-gradient(to right, #10b981, #3b82f6)'"
              >
                📚 트립북에 담기
              </button>
            </div>
          `;
          
          const popup = L.popup({
            maxWidth: 250,
            className: 'custom-popup'
          }).setContent(popupContent);
          
          marker.bindPopup(popup);
          
          // 팝업이 열릴 때 버튼 이벤트 리스너 추가
          marker.on('popupopen', () => {
            const button = document.getElementById(`add-to-tripbook-${place.id}`);
            if (button) {
              button.addEventListener('click', () => {
                if (!tripBookPlaces.find(p => p.id === place.id)) {
                  setTripBookPlaces(prev => [...prev, place]);
                }
              });
            }
          });

          createdMarkers.push({ marker, place });
        });

        setMarkers(createdMarkers);
        setMapInstance(map);
        
        // 줌 레벨 변경 이벤트 리스너
        map.on('zoomend', () => {
          setCurrentZoom(map.getZoom());
        });
      }
    };

    return () => {
      // Cleanup은 선택사항 (필요시 map.remove() 호출)
    };
  }, []);

  // 검색 기능
  useEffect(() => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      setSearchedPlaces([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    // 이름과 키워드(주소, 타입)로 검색
    const results = samplePlaces.filter(place => 
      place.name.toLowerCase().includes(query) ||
      place.address.toLowerCase().includes(query) ||
      place.type.includes(query)
    );

    setSearchedPlaces(results);
    setShowSearchResults(true);
  }, [searchQuery]);

  // 검색 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        const dropdown = document.querySelector('.search-dropdown-container');
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setShowSearchResults(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 필터, 검색, 줌 레벨에 따라 마커 표시/숨김
  useEffect(() => {
    if (!mapInstance) return;

    markers.forEach(({ marker, place }) => {
      let shouldShow = false;

      // 줌 레벨 조건 (줌이 충분히 확대되었을 때만 표시)
      const isZoomedIn = currentZoom >= MIN_ZOOM_FOR_MARKERS;

      // 필터 조건
      const matchesFilter = selectedFilter === '전체' || place.type === selectedFilter;

      // 검색 조건
      const matchesSearch = !searchQuery.trim() || searchedPlaces.some(p => p.id === place.id);

      shouldShow = isZoomedIn && matchesFilter && matchesSearch;

      if (shouldShow) {
        marker.addTo(mapInstance);
      } else {
        marker.remove();
      }
    });
  }, [selectedFilter, searchedPlaces, searchQuery, markers, mapInstance, currentZoom]);

  const removeFromTripBook = (placeId: string) => {
    setTripBookPlaces(prev => prev.filter(place => place.id !== placeId));
  };

  const addToTripBook = (place: Place) => {
    if (tripBookPlaces.find(p => p.id === place.id)) {
      alert('이미 트립북에 추가된 장소입니다.');
      return;
    }
    setTripBookPlaces(prev => [...prev, place]);
  };

  const handleSelectSearchResult = (place: Place) => {
    setSearchQuery(place.name);
    setShowSearchResults(false);
    if (mapInstance) {
      mapInstance.setView([place.lat, place.lng], 15);
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setShowSearchResults(false);
    setSearchedPlaces([]);
  };

  const filteredPlaces = selectedFilter === '전체' 
    ? samplePlaces 
    : samplePlaces.filter(place => place.type === selectedFilter);

  // 지도 줌 컨트롤
  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.zoomOut();
    }
  };

  const handleFocusOnPlace = (place: Place) => {
    if (mapInstance) {
      mapInstance.setView([place.lat, place.lng], 15);
    }
  };

  const getPlaceIcon = (type: string) => {
    switch (type) {
      case '음식점': return <Utensils className="w-5 h-5" />;
      case '숙소': return <Hotel className="w-5 h-5" />;
      case '관광지': return <Landmark className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="icon"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="장소 이름, 주소, 카테고리로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                className="pl-12 pr-10 py-5 border-green-200 focus:border-green-400"
              />
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              
              {/* 검색 결과 드롭다운 */}
              <AnimatePresence>
                {showSearchResults && searchedPlaces.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="search-dropdown-container absolute top-full left-0 right-0 mt-2 bg-white border border-green-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-500">
                        {searchedPlaces.length}개의 검색 결과
                      </div>
                      {searchedPlaces.map((place) => (
                        <button
                          key={place.id}
                          onClick={() => handleSelectSearchResult(place)}
                          className="w-full flex items-start gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors text-left"
                        >
                          <div className={`p-2 rounded-lg ${
                            place.type === '음식점' ? 'bg-red-100 text-red-600' :
                            place.type === '숙소' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {getPlaceIcon(place.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-800 mb-1 truncate">{place.name}</h4>
                            <p className="text-sm text-gray-500 mb-1 truncate">{place.address}</p>
                            <Badge className={`text-xs ${
                              place.type === '음식점' ? 'bg-red-500' :
                              place.type === '숙소' ? 'bg-blue-500' :
                              'bg-green-500'
                            } text-white`}>
                              {place.type}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 검색 결과 없음 */}
              <AnimatePresence>
                {showSearchResults && searchQuery.trim() && searchedPlaces.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="search-dropdown-container absolute top-full left-0 right-0 mt-2 bg-white border border-green-200 rounded-lg shadow-xl p-6 z-50"
                  >
                    <div className="text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 mb-1">검색 결과가 없습니다</p>
                      <p className="text-sm text-gray-400">
                        다른 키워드로 검색해보세요
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3">
              <Button
                ref={tripBookButtonRef}
                onClick={() => setIsTripBookOpen(!isTripBookOpen)}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 relative"
              >
                <BookMarked className="w-5 h-5 mr-2" />
                트립북
                {tripBookPlaces.length > 0 && (
                  <motion.span 
                    key={tripBookPlaces.length}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    {tripBookPlaces.length}
                  </motion.span>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                  트립메이트
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 지도 영역 */}
      <div className="h-[calc(100vh-88px)] relative">
        {/* 지도 컨테이너 */}
        <div 
          ref={mapContainerRef}
          className="absolute inset-0 bg-gray-100"
          style={{ zIndex: 0 }}
        />

        {/* 장소 필터 */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {(['전체', '음식점', '숙소', '관광지'] as const).map((filter) => (
            <Button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              className={
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white border-green-300 text-green-700 hover:bg-green-50 shadow-md'
              }
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* 줌 컨트롤 */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button
            onClick={handleZoomIn}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-50 shadow-md border-gray-300"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleZoomOut}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-50 shadow-md border-gray-300"
          >
            <Minus className="w-5 h-5" />
          </Button>
        </div>

        {/* 트립북 사이드바 */}
        <AnimatePresence>
          {isTripBookOpen && (
            <>
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl text-gray-800">나의 트립북</h3>
                  </div>
                  <Button
                    onClick={() => setIsTripBookOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {tripBookPlaces.length === 0 ? (
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookMarked className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-2">트립북이 비어있어요</p>
                      <p className="text-sm text-gray-400">
                        원하는 장소를 추가해보세요!
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      {tripBookPlaces.map((place) => (
                        <motion.div
                          key={place.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                {getPlaceIcon(place.type)}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-gray-800 mb-1">{place.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{place.address}</p>
                                <Badge className="text-xs bg-green-500 text-white">
                                  {place.type}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              onClick={() => removeFromTripBook(place.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {tripBookPlaces.length > 0 && (
                  <div className="p-6 border-t border-gray-200">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      일정 짜기 ({tripBookPlaces.length}개 장소)
                    </Button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
