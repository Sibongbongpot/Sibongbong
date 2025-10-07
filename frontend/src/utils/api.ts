/**
 * API 통신 유틸리티
 * 백엔드 서버와의 통신을 담당합니다.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * API 요청 헬퍼 함수
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
}

/**
 * 로그인 API
 */
export async function login(username: string, password: string) {
  return apiRequest<{ token: string; user: any }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

/**
 * 회원가입 API
 */
export async function signup(username: string, email: string, password: string) {
  return apiRequest<{ message: string }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

/**
 * 장소 목록 가져오기
 */
export async function getPlaces(filters?: {
  region?: string;
  category?: string;
  purposes?: string[];
}) {
  const params = new URLSearchParams();
  if (filters?.region) params.append('region', filters.region);
  if (filters?.category) params.append('category', filters.category);
  if (filters?.purposes) params.append('purposes', filters.purposes.join(','));
  
  const queryString = params.toString();
  const endpoint = queryString ? `/places?${queryString}` : '/places';
  
  return apiRequest<any[]>(endpoint);
}

/**
 * 트립북에 장소 추가
 */
export async function addToTripbook(userId: string, placeId: string) {
  return apiRequest<{ message: string }>(`/tripbook/${userId}`, {
    method: 'POST',
    body: JSON.stringify({ placeId }),
  });
}

/**
 * 최적 경로 계산
 */
export async function calculateRoute(placeIds: string[]) {
  return apiRequest<{ route: any[]; totalDistance: number; totalTime: number }>(
    '/route/optimize',
    {
      method: 'POST',
      body: JSON.stringify({ placeIds }),
    }
  );
}
