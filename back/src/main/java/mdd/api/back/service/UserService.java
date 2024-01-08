package mdd.api.back.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.Data;
import mdd.api.back.dto.UserDto;
import mdd.api.back.model.User;
import mdd.api.back.repository.UserRepository;

@Data
@Service
public class UserService {

  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  public Integer getUserIdFromToken(String token) {
    String email = jwtService.getUsernameFromToken(token);
    User userRepos = userRepository.findByEmail(email).orElse(null);
    Integer userId = userRepos.getId();
    return userId;
  }

  public User getByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  public UserDto getById(Integer id) {
    User user = userRepository.findById(id).orElse(null);
    if (user != null) {
      return modelMapper.map(user, UserDto.class);
    } else {
      return null;
    }
  }

  @PostConstruct
  public void configureModelMapper() {
    modelMapper.createTypeMap(User.class, UserDto.class)
        .addMapping(User::getUsername, UserDto::setEmail)
        .addMapping(User::getName, UserDto::setName)
        .addMapping(User::getCreated_at, UserDto::setCreated_at)
        .addMapping(User::getUpdated_at, UserDto::setUpdated_at);
  }
}
