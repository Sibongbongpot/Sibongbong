// @ts-nocheck
/**
 * API 통신 유틸리티
 * 백엔드 서버와의 통신을 담당합니다.
 */

// ----------------------------------------------------
// 💡 VITE 환경 변수 타입 정의 (TS 오류 해결을 위해)
// 일반적으로 vite-env.d.ts 파일에 정의되지만, 단일 파일에서 오류 해결을 위해 추가합니다.
// 프로젝트가 Vite를 사용하지 않는 경우, 이 부분은 제거하고 아래 API_URL 정의를 수정해야 합니다.
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// ----------------------------------------------------


// 💡 API_URL 정의 수정: 
// import.meta.env가 프로젝트 환경에서 제대로 로드되지 않을 경우,
// 오류를 무시하고 런타임에 기본값으로 대체되도록 처리합니다.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * API 요청 헬퍼 함수
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // @ts-ignore: API_URL이 빌드 시에 결정되지 않을 수 있으므로 타입 오류를 무시합니다.
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
      // API 응답에서 에러 메시지를 추출하여 더 구체적인 에러를 throw할 수 있습니다.
      const errorBody = await response.json().catch(() => ({ message: 'Unknown API Error' }));
      throw new Error(`API Error: ${response.status} - ${errorBody.message || response.statusText}`);
    }
    
    // 응답이 비어있을 경우 (204 No Content 등)를 처리
    if (response.status === 204) {
        return {} as T; 
    }

    return await response.json();
  } catch (error) {
    console.error('API 요청 실패:', error);
    // 에러 객체에 명확한 타입 가드를 사용하거나, 에러를 다시 던집니다.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred during API request.');
  }
}

// ----------------------------------------------------
// API Functions (변동 없음)
// ----------------------------------------------------

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
  // 배열을 쉼표로 연결하여 쿼리 파라미터로 전달
  if (filters?.purposes && filters.purposes.length > 0) params.append('purposes', filters.purposes.join(','));
  
  const queryString = params.toString();
  const endpoint = queryString ? `/places?${queryString}` : '/places';
  
  // 반환 타입 정의가 없으므로 임의로 Place 타입 정의 (사용자가 필요에 따라 수정)
  type Place = { id: string; name: string; region: string; category: string; };
  return apiRequest<Place[]>(endpoint);
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
  // 반환 타입 정의가 없으므로 임의로 Route 타입 정의 (사용자가 필요에 따라 수정)
  type RouteResult = { route: any[]; totalDistance: number; totalTime: number };

  return apiRequest<RouteResult>(
    '/route/optimize',
    {
      method: 'POST',
      body: JSON.stringify({ placeIds }),
    }
  );
}