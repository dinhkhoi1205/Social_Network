package com.dtdk.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    String path = request.getRequestURI();

	    if (path.startsWith("/auth")) {
	        filterChain.doFilter(request, response);
	        return;
	    }

	    String header = request.getHeader(JwtConstant.JWT_HEADER);

	    if (header == null || !header.startsWith("Bearer ")) {
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	        response.getWriter().write("Missing or invalid Authorization header");
	        return;
	    }

	    String jwt = header.substring(7);

	    try {
	    	SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

	        String email = String.valueOf(claims.get("email"));
	        String authorities = String.valueOf(claims.get("authorities"));

	        List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

	        org.springframework.security.core.userdetails.User userDetails =
	            new org.springframework.security.core.userdetails.User(email, "", auths);
	        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, auths);

	        // Logging
	        System.out.println("🔐 Authenticated user: " + email);
	        System.out.println("🔐 Authorities: " + authorities);
	        System.out.println("🔐 Bearer token: [" + jwt + "]");

	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        filterChain.doFilter(request, response);
	    } catch (Exception e) {
	        SecurityContextHolder.clearContext();
	        e.printStackTrace(); // IN STACK TRACE
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	        response.getWriter().write("Invalid JWT token: " + e.getMessage()); // Log message
	    }
	}
}
