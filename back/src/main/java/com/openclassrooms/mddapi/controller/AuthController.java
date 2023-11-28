package com.openclassrooms.mddapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @PostMapping(value = "login")
  public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto request) {
    return ResponseEntity.ok(authService.login(request));
  }

  @PostMapping(value = "register")
  public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto request) {
    AuthResponseDto registrationResult = authService.register(request);
    System.out.println("registrationResult");
    System.out.println(registrationResult);

    if (registrationResult == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    return ResponseEntity.ok(registrationResult);
  }

  @PutMapping(value = "me")
  public ResponseEntity<AuthResponseDto> updateProfile(@RequestBody UserUpdateDto request) {
    AuthResponseDto updateResult = authService.updateProfile(request);

    if (updateResult == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    return ResponseEntity.ok(updateResult);
  }

  @GetMapping(value = "me")
  public ResponseEntity<UserDto> getMyProfile() {
    UserDto userDto = AuthService.getCurrentUser();

    if (userDto == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(userDto);
  }
}
