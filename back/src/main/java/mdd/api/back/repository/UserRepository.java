package mdd.api.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mdd.api.back.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email); // Because email is unique we can named it like we want
}
