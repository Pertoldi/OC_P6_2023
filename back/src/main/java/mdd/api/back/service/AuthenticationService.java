package mdd.api.back.service;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mdd.api.back.dto.AuthResponseDto;
import mdd.api.back.model.User;
import mdd.api.back.repository.UserRepository;
import mdd.api.back.request.LoginRequest;
import mdd.api.back.request.RegisterRequest;
import mdd.api.back.request.UserUpdateRequest;
import mdd.api.back.response.AuthenticationResponse;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationResponse register(RegisterRequest request) {
    var user = User
        .builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .build();

    userRepository.save(user);

    var jwtToken = jwtService.generateToken(user);

    return AuthenticationResponse
        .builder()
        .token(jwtToken)
        .build();
  }

  public AuthenticationResponse login(LoginRequest request) {
    authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    var user = userRepository.findByEmail(request.getEmail()).orElseThrow();

    var jwtToken = jwtService.generateToken(user);

    return AuthenticationResponse
        .builder()
        .token(jwtToken)
        .build();
  }

  public AuthResponseDto updateProfile(UserUpdateRequest request) {
    System.out.println("request TEST: " + request);
    // Retrieve the currently authenticated user
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    // Retrieve the user from the database based on the authenticated user's
    // email
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
    System.out.println("user: " + user);

    // Update the user's information
    if (request.getName() != null) {
      Optional<User> userEmail = userRepository.findByEmail(request.getEmail());
      user.setName(request.getName());
      System.out.println("!userEmail.isPresent(): " + !userEmail.isPresent());
      System.out.println("!userEmail.isPresent(): " + !userEmail.isPresent());
      System.out.println("isValidEmail(request.getEmail()): " + isValidEmail(request.getEmail()));
      if (isValidEmail(request.getEmail()) && !userEmail.isPresent()) {
        user.setEmail(request.getEmail());
      }
    }

    // Save the updated user to the database
    userRepository.save(user);

    // Generate a new JWT token for the updated user
    UserDetails updatedUserDetails = userRepository.findByEmail(user.getUsername())
        .orElseThrow(() -> new RuntimeException("Updated user not found"));

    // Generate a new access token with the updated email
    String newAccessToken = jwtService.generateToken(updatedUserDetails);

    // Generate a new refresh token
    return AuthResponseDto.builder()
        .jwt(newAccessToken)
        .build();
  }

  private boolean isValidEmail(String email) {
    String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$";
    Pattern pattern = Pattern.compile(emailRegex);
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
  }
}