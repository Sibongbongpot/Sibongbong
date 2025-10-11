/**
 * 🧪 테스트 페이지 - Tailwind 없이 순수 인라인 스타일
 */

export function TestPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
          }}
        >
          ✅ React 작동 확인!
        </h1>
        
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          이 화면이 보인다면 React는 정상 작동 중입니다!
        </p>

        <div
          style={{
            background: '#f0fdf4',
            border: '2px solid #10b981',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <p style={{ fontSize: '16px', color: '#047857', fontWeight: '600' }}>
            🎉 성공! 이제 Tailwind 문제만 해결하면 됩니다!
          </p>
        </div>

        <button
          onClick={() => alert('버튼 클릭 작동!')}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          }}
        >
          클릭 테스트
        </button>

        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            background: '#eff6ff',
            border: '2px dashed #3b82f6',
            borderRadius: '8px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#1e40af', marginBottom: '10px' }}>
            <strong>다음 단계:</strong>
          </p>
          <p style={{ fontSize: '14px', color: '#1e40af' }}>
            1. 터미널에서 Ctrl+C로 서버 중지<br />
            2. npm install 다시 실행<br />
            3. npm run dev 재시작<br />
            4. 브라우저 새로고침 (Ctrl+Shift+R)
          </p>
        </div>
      </div>
    </div>
  );
}
