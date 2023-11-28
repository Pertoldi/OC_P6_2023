package com.openclassrooms.mddapi.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JwtAuthentificationFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, @Nonnull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String userEmail;
    final boolean isJwtInRequest = authHeader != null && authHeader.startsWith("Bearer ");
    final boolean userIsNotConnected = SecurityContextHolder.getContext().getAuthentication() == null;

    if (!isJwtInRequest) {
      filterChain.doFilter(request, response);
      return;
    }

    jwt = authHeader.substring(7);

    userEmail = jwtService.extractUserEmail(jwt);

    if (userEmail != null && userIsNotConnected) {
      UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail); // We get the user details from
                                                                                       // the database
      if (jwtService.isTokenValid(jwt, userDetails)) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());

        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // We enforce the
                                                                                          // authentication token with
                                                                                          // the details of our request

        SecurityContextHolder.getContext().setAuthentication(authToken); // We update the authentication token

      }
      filterChain.doFilter(request, response); // = next()
    }
  }
}
