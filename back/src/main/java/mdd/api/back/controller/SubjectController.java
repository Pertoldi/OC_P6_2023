package mdd.api.back.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import mdd.api.back.dto.SubjectDto;
import mdd.api.back.service.SubjectService;

@RestController
@RequestMapping("/api/subject")
@AllArgsConstructor
public class SubjectController {

  private final SubjectService subjectService;

  @GetMapping
  public Map<String, List<SubjectDto>> getSubjects() {
    return subjectService.getSubjects();
  }

  @GetMapping("/{id}")
  public ResponseEntity<SubjectDto> getSubject(@PathVariable Integer id) {
    SubjectDto subjectsDto = subjectService.getSubject(id);
    if (subjectsDto == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(subjectsDto);
  }
}
