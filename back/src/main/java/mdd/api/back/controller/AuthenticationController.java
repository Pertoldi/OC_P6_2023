package mdd.api.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mdd.api.back.model.User;
import mdd.api.back.request.LoginRequest;
import mdd.api.back.request.RegisterRequest;
import mdd.api.back.response.AuthenticationResponse;
import mdd.api.back.service.AuthenticationService;
import mdd.api.back.service.JwtService;
import mdd.api.back.service.UserService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  public final AuthenticationService authenticationService;
  private final JwtService jwtService;
  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authenticationService.register(request));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authenticationService.login(request));
  }

  @GetMapping("/me")
  public ResponseEntity<User> getUser(HttpServletRequest request) {

    final String authHeader = request.getHeader("Authorization");

    String jwt = authHeader.substring(7);
    String userEmail = jwtService.extractUserEmail(jwt);
    return ResponseEntity.ok(userService.getByEmail(userEmail));

  }
}
