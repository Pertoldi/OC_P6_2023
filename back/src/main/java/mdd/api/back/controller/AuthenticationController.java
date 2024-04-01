package mdd.api.back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mdd.api.back.dto.AuthResponseDto;
import mdd.api.back.model.User;
import mdd.api.back.request.LoginRequest;
import mdd.api.back.request.RegisterRequest;
import mdd.api.back.request.UserUpdateRequest;
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

  @PutMapping(value = "me")
  public ResponseEntity<AuthResponseDto> updateProfile(@RequestBody UserUpdateRequest request) {
    AuthResponseDto updateResult = authenticationService.updateProfile(request);

    if (updateResult == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    return ResponseEntity.ok(updateResult);
  }

  @GetMapping("/me")
  public ResponseEntity<User> getUser(HttpServletRequest request) {

    final String authHeader = request.getHeader("Authorization");

    String jwt = authHeader.substring(7);
    String userEmail = jwtService.extractUserEmail(jwt);
    return ResponseEntity.ok(userService.getByEmail(userEmail));

  }
}
