/**
 * 지도 페이지 컴포넌트
 */

import { useState, useRef } from 'react';
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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Place {
  id: string;
  name: string;
  type: '음식점' | '숙소' | '관광지';
  address: string;
}

interface MapPageProps {
  onBack: () => void;
}

export function MapPage({ onBack }: MapPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTripBookOpen, setIsTripBookOpen] = useState(false);
  const [tripBookPlaces, setTripBookPlaces] = useState<Place[]>([]);
  const tripBookButtonRef = useRef<HTMLButtonElement>(null);

  const samplePlaces: Place[] = [
    { id: '1', name: '수원 화성', type: '관광지', address: '경기도 수원시 팔달구' },
    { id: '2', name: '에버랜드', type: '관광지', address: '경기도 용인시 처인구' },
    { id: '3', name: '파주 프리미엄 아울렛', type: '관광지', address: '경기도 파주시' },
  ];

  const removeFromTripBook = (placeId: string) => {
    setTripBookPlaces(prev => prev.filter(place => place.id !== placeId));
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="장소를 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-5 border-green-200 focus:border-green-400"
              />
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
        <div className="h-full flex items-center justify-center bg-white">
          <div className="text-center p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-800 mb-3">
              지도 기능 개발 예정
            </h2>
            <p className="text-gray-600 mb-6">
              곧 경기권의 다양한 장소를<br />
              지도에서 확인하실 수 있습니다!
            </p>
            <div className="inline-block px-6 py-3 bg-gray-100 rounded-lg text-gray-700">
              검색 기능은 준비 중입니다
            </div>
          </div>
        </div>

        {/* 트립북 사이드바 */}
        <AnimatePresence>
          {isTripBookOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsTripBookOpen(false)}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
              />
              
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
