package com.SibongbongPot.backend.filter;

import com.SibongbongPot.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// @RequiredArgsConstructor: final 필드에 대한 생성자를 자동으로 만들어줍니다.
@RequiredArgsConstructor
// OncePerRequestFilter: 모든 요청에 대해 딱 한 번만 실행되는 필터를 만듭니다.
public class JwtFilter extends OncePerRequestFilter {

    // final 키워드를 사용해 생성자에서 반드시 주입받도록 설정합니다.
    private final JwtUtil jwtUtil; // 이제 secretKey 대신 JwtUtil을 직접 주입받습니다.

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 요청 헤더에서 'Authorization' 값을 가져옵니다. (토큰은 보통 여기에 담겨 옵니다)
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 1. Authorization 헤더가 없거나, 'Bearer '로 시작하지 않으면 토큰이 없는 것으로 간주합니다.
        //    이 경우, 그냥 다음 필터로 요청을 넘기고 로직을 종료합니다.
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. 'Bearer ' 부분을 제거해서 순수한 토큰 값만 추출합니다.
        String token = authorization.split(" ")[1];

        // 3. 토큰이 만료되었는지 확인합니다. 만료되었다면 다음 필터로 넘기고 종료합니다.
        if (jwtUtil.isExpired(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 4. 토큰에서 사용자 이름(username)을 추출합니다.
        String username = jwtUtil.getUsername(token);

        // 5. Spring Security에게 현재 사용자가 누구인지 알려주는 과정입니다.
        //    사용자 이름, 권한 등을 담은 인증 토큰(AuthenticationToken)을 만듭니다.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, null, List.of(new SimpleGrantedAuthority("USER")));
        
        // 요청에 대한 세부 정보를 인증 토큰에 담습니다.
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        
        // SecurityContextHolder에 인증 정보를 저장해서, 이제부터 이 사용자는 '인증된 사용자'임을 시스템에 알립니다.
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        
        // 모든 검문이 끝났으니, 원래 가려던 목적지(컨트롤러)로 요청을 계속 진행시킵니다.
        filterChain.doFilter(request, response);
    }
}