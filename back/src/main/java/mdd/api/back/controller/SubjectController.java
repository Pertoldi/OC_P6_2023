package mdd.api.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.AllArgsConstructor;
import mdd.api.back.dto.SubjectDto;
import mdd.api.back.model.User;
import mdd.api.back.repository.UserRepository;
import mdd.api.back.service.SubjectService;

@RestController
@RequestMapping("/api/subject")
@AllArgsConstructor
public class SubjectController {

  private final SubjectService subjectService;
  private final UserRepository userRepository;

  @GetMapping
  public List<SubjectDto> getAll() {
    return subjectService.getAll();
  }

  @GetMapping("user")
  public ResponseEntity<List<SubjectDto>> getByUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
    List<SubjectDto> subjectsDto = subjectService.getAllSubjectsByUserId(user.getId());
    if (subjectsDto == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(subjectsDto);
  }
}
