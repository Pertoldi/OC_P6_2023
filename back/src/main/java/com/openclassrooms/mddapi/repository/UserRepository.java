package com.openclassrooms.mddapi.repository;

import java.util.Optional;

import com.openclassrooms.mddapi.model.User;

public class UserRepository {
  Optional<User> findByUsername(String username);
}
