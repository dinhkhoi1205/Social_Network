package com.dtdk.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
	SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        String authorities = auth.getAuthorities().stream()
            .map(grantedAuthority -> grantedAuthority.getAuthority())
            .reduce((a, b) -> a + "," + b)
            .orElse("");

        String jwt = Jwts.builder()
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiration
            .claim("email", auth.getName())
            .claim("authorities", authorities)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        return jwt;
    }

    public String getEmailFromToken(String jwt) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        return String.valueOf(claims.get("email"));
    }
}
