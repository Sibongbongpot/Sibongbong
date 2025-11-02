/**
 * 홈 페이지 컴포넌트
 * 사용자의 메인 대시보드
 */

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Settings, 
  BookMarked, 
  Calendar,
  Utensils,
  Hotel,
  Landmark,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Place {
  id: string;
  name: string;
  type: '음식점' | '숙소' | '관광지';
  address: string;
}

interface HomePageProps {
  username: string;
  preferences: {
    purposes: {
      '맛집투어': boolean;
      '랜드마크투어': boolean;
      '쇼핑': boolean;
      '자연감상': boolean;
      '문화체험': boolean;
    };
    timePreference: '낮' | '밤';
  };
  onNavigateToMap: () => void;
  onNavigateToSettings: () => void;
  onLogout: () => void;
}

export function HomePage({ username, preferences, onNavigateToMap, onNavigateToSettings }: HomePageProps) {
  const [isTripBookOpen, setIsTripBookOpen] = useState(false);
  const [tripBookPlaces, setTripBookPlaces] = useState<Place[]>([]);
  const [flyingItems, setFlyingItems] = useState<Array<{id: string, x: number, y: number}>>([]);
  const tripBookButtonRef = useRef<HTMLButtonElement>(null);
  
  const selectedPurposes = Object.entries(preferences.purposes)
    .filter(([_, selected]) => selected)
    .map(([purpose, _]) => purpose);

  const samplePlaces: Place[] = [
    { id: '1', name: '수원 화성', type: '관광지', address: '경기도 수원시 팔달구' },
    { id: '2', name: '에버랜드', type: '관광지', address: '경기도 용인시 처인구' },
    { id: '3', name: '파주 프리미엄 아울렛', type: '관광지', address: '경기도 파주시' },
  ];

  const addToTripBook = (place: Place, event: React.MouseEvent<HTMLButtonElement>) => {
    if (tripBookPlaces.find(p => p.id === place.id)) {
      alert('이미 트립북에 추가된 장소입니다.');
      return;
    }
    
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    
    const flyingId = `${place.id}-${Date.now()}`;
    setFlyingItems(prev => [...prev, { id: flyingId, x: startX, y: startY }]);
    
    setTimeout(() => {
      setTripBookPlaces([...tripBookPlaces, place]);
      setFlyingItems(prev => prev.filter(item => item.id !== flyingId));
    }, 500);
  };

  const removeFromTripBook = (placeId: string) => {
    setTripBookPlaces(tripBookPlaces.filter(p => p.id !== placeId));
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* 헤더 */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  트립메이트
                </h1>
                <p className="text-sm text-gray-600">{username}님 환영합니다!</p>
              </div>
            </div>
            
            <div className="flex gap-2">
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
              
              <Button
                onClick={onNavigateToSettings}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 나의 여행 취향 */}
          <Card className="p-6 border-green-100">
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <span className="text-green-600">📋</span>
              나의 여행 취향
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                <label className="block text-base text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span>여행 목적</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedPurposes.length > 0 ? (
                    selectedPurposes.map((p) => (
                      <Badge key={p} className="bg-green-500 text-white border-green-600 px-4 py-2 text-base shadow-md">
                        {p}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">선택된 여행 목적이 없습니다.</p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                <label className="block text-base text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">⏰</span>
                  <span>선호 시간대</span>
                </label>
                <Badge className="bg-blue-500 text-white border-blue-600 px-4 py-2 text-base shadow-md">
                  {preferences.timePreference === '낮' ? (
                    <><Sun className="w-5 h-5 mr-2" /> 낮 활동</>
                  ) : (
                    <><Moon className="w-5 h-5 mr-2" /> 밤 활동</>
                  )}
                </Badge>
              </div>
            </div>
          </Card>

          {/* 지도에서 더 많은 장소 찾기 */}
          <Card className="p-6 border-green-100 bg-gradient-to-br from-green-100 to-blue-100 flex flex-col justify-center">
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-600" />
              지도에서 더 많은 장소 찾기
            </h2>
            <p className="text-gray-700 mb-6">
              경기권의 다양한 음식점, 숙소, 관광지를 지도에서 확인하세요!
            </p>
            <Button
              onClick={onNavigateToMap}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              지도 열기
            </Button>
          </Card>
        </div>

        {/* 추천 장소 */}
        <Card className="p-6 mb-8 border-blue-100">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <span className="text-blue-600">✨</span>
            추천 장소
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {samplePlaces.map((place) => (
              <Card key={place.id} className="p-4 hover:shadow-lg transition-shadow border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-green-600">
                      {getPlaceIcon(place.type)}
                    </div>
                    <div>
                      <h3 className="text-base">{place.name}</h3>
                      <p className="text-sm text-gray-500">{place.type}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{place.address}</p>
                <Button
                  onClick={(e) => addToTripBook(place, e)}
                  size="sm"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  트립북에 담기
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </main>

      {/* 날아가는 애니메이션 */}
      <AnimatePresence>
        {flyingItems.map((item) => {
          const tripBookButton = tripBookButtonRef.current;
          if (!tripBookButton) return null;
          
          const buttonRect = tripBookButton.getBoundingClientRect();
          const endX = buttonRect.left + buttonRect.width / 2;
          const endY = buttonRect.top + buttonRect.height / 2;
          
          return (
            <motion.div
              key={item.id}
              className="fixed pointer-events-none z-50"
              style={{
                left: item.x - 24,
                top: item.y - 24,
              }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ x: endX - item.x, y: endY - item.y, scale: 0.3, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                <BookMarked className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* 트립북 사이드바 */}
      <AnimatePresence>
        {isTripBookOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTripBookOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl flex items-center gap-2">
                    <BookMarked className="w-6 h-6 text-green-600" />
                    나의 트립북
                  </h2>
                  <Button
                    onClick={() => setIsTripBookOpen(false)}
                    variant="ghost"
                    size="icon"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {tripBookPlaces.length === 0 ? (
                  <div className="text-center py-12">
                    <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      아직 담긴 장소가 없습니다.<br />
                      마음에 드는 장소를 담아보세요!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {tripBookPlaces.map((place, index) => (
                        <motion.div
                          key={place.id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-4 border-green-100">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-green-600">
                                  {getPlaceIcon(place.type)}
                                </div>
                                <div>
                                  <h3 className="text-base">{place.name}</h3>
                                  <p className="text-sm text-gray-500">{place.type}</p>
                                  <p className="text-sm text-gray-400">{place.address}</p>
                                </div>
                              </div>
                              <Button
                                onClick={() => removeFromTripBook(place.id)}
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
                      <h3 className="text-base mb-3 flex items-center gap-2">
                        <Hotel className="w-5 h-5 text-blue-600" />
                        숙소 예약
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        트립북에 담긴 숙소를 예약하세요
                      </p>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        예약하기
                      </Button>
                    </Card>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      최적 경로 계산하기
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
