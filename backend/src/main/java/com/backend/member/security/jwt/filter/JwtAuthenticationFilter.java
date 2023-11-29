package com.backend.member.security.jwt.filter;

import com.backend.member.security.jwt.exception.JwtExceptionCode;
import com.backend.member.security.jwt.token.JwtAuthenticationToken;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getToken(request);
            if (StringUtils.hasText(token)) {
                getAuthentication(token);
            }
            filterChain.doFilter(request, response);
        } catch (BadCredentialsException e) {
            // 토큰이 없는 경우 또는 유효하지 않은 토큰인 경우, 다음 필터로 넘어갑니다.
            filterChain.doFilter(request, response);
        } catch (SecurityException | MalformedJwtException e) {
            handleTokenException(request, JwtExceptionCode.INVALID_TOKEN, e);
        } catch (ExpiredJwtException e) {
            handleTokenException(request, JwtExceptionCode.EXPIRED_TOKEN, e);
        } catch (UnsupportedJwtException e) {
            handleTokenException(request, JwtExceptionCode.UNSUPPORTED_TOKEN, e);
        } catch (Exception e) {
            log.error("====================================================");
            log.error("JwtFilter - doFilterInternal() 오류 발생");
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception StackTrace : {");
            e.printStackTrace();
            log.error("}");
            log.error("====================================================");
            throw new BadCredentialsException("throw new exception");
        }
    }

    private void getAuthentication(String token) {
        JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(token);
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authenticate);
    }

    private String getToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
            String[] arr = authorization.split(" ");
            return arr[1];
        } else {
            throw new BadCredentialsException("No valid token found in the request headers");
        }
    }

    private void handleTokenException(HttpServletRequest request, JwtExceptionCode exceptionCode, Exception e) {
        request.setAttribute("exception", exceptionCode.getCode());
        log.error("{} // token : {}", exceptionCode.getMessage(), getToken(request));
        log.error("Set Request Exception Code : {}", request.getAttribute("exception"));
        throw new BadCredentialsException("throw new " + exceptionCode.getMessage(), e);
    }
}
