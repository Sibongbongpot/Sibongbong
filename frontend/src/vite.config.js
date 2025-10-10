import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// 💡 핵심 수정: require() 대신 Vite가 선호하는 import() 방식을 사용합니다.
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  // 프로젝트 루트를 명시하여 빌드 환경 변수 충돌을 방지합니다.
  root: path.resolve(__dirname, './'),

  plugins: [react()],

  // Tailwind CSS/PostCSS 플러그인을 Vite의 CSS 처리 단계에 직접 강제 주입합니다.
  css: {
    postcss: {
      plugins: [
        // import된 플러그인 객체를 바로 전달합니다.
        tailwindcss,
        autoprefixer,
      ],
    },
  },

  // 경로 별칭 설정: '@'를 사용하여 './src' 경로를 쉽게 참조할 수 있도록 합니다.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
