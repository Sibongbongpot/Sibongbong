/**
 * 카카오 맵 API 타입 선언
 */

interface Window {
  kakao: {
    maps: {
      load: (callback: () => void) => void;
      LatLng: new (lat: number, lng: number) => any;
      Map: new (container: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
    };
  };
}
