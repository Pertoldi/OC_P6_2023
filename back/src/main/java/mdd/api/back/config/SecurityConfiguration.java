package mdd.api.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    private static final String[] ROUTES_WHITE_LIST = {
            "/api/auth/register",
            "/api/auth/login",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { // Configure sécurity of
                                                                                         // all
                                                                                         // our
                                                                                         // application

        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth // Whitelist of some endpoint that don't need
                                                    // authentication
                        .requestMatchers(ROUTES_WHITE_LIST)
                        .permitAll() // All the request on the withelist are permitten
                        .anyRequest() // any other request should be autenticated
                        .authenticated())
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // that mean
                                                                                 // the session
                                                                                 // state sould
                                                                                 // not be store
                                                                                 // (each
                                                                                 // request
                                                                                 // shoud be
                                                                                 // autenticated)
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class) // we link the filter here

                .build();
    }
}
