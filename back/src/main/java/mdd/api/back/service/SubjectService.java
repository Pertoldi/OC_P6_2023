package mdd.api.back.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mdd.api.back.dto.SubjectDto;
import mdd.api.back.model.Subject;
import mdd.api.back.repository.SubjectRepository;

@Service
@AllArgsConstructor
public class SubjectService {
  private final SubjectRepository subjectRepository;
  private final ModelMapper modelMapper;

  @PostConstruct
  public void configureModelMapper() {
    modelMapper.createTypeMap(Subject.class, SubjectDto.class)
        .addMapping(Subject::getCreatedAt, SubjectDto::setCreated_at)
        .addMapping(Subject::getUpdatedAt, SubjectDto::setUpdated_at);
  }

  private SubjectDto mapToSubjectDto(Subject subject) {
    return modelMapper.map(subject, SubjectDto.class);
  }

  public Map<String, List<SubjectDto>> getAll() {
    List<Subject> subjects = subjectRepository.findAll();
    List<SubjectDto> subjectDtos = subjects.stream()
        .map(this::mapToSubjectDto)
        .collect(Collectors.toList());

    Map<String, List<SubjectDto>> response = new HashMap<>();
    response.put("subjects", subjectDtos);

    return response;
  }

  public SubjectDto getById(Integer id) {
    Subject subject = subjectRepository.findById(id).orElse(null);
    if (subject != null) {
      return mapToSubjectDto(subject);
    }
    return null;
  }
}
