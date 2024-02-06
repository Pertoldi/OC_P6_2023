package mdd.api.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mdd.api.back.dto.SubjectDto;
import mdd.api.back.model.Subject;
import mdd.api.back.model.Subscription;
import mdd.api.back.model.User;
import mdd.api.back.repository.SubjectRepository;
import mdd.api.back.repository.SubscriptionRepository;
import mdd.api.back.repository.UserRepository;

@Service
@AllArgsConstructor
public class SubjectService {
  private final SubjectRepository subjectRepository;
  private final SubscriptionRepository subscriptionRepository;
  private final UserRepository userRepository;
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

  // public Map<String, List<SubjectDto>> getAll() {
  public List<SubjectDto> getAll() {
    List<Subject> subjects = subjectRepository.findAll();
    List<SubjectDto> response = subjects.stream()
        .map(this::mapToSubjectDto)
        .collect(Collectors.toList());

    return response;
  }

  public SubjectDto getById(Integer id) {
    Subject subject = subjectRepository.findById(id).orElse(null);
    if (subject != null) {
      return mapToSubjectDto(subject);
    }
    return null;
  }

  public List<SubjectDto> getAllSubjectsByUserId(Integer userId) {
    // Retrieve the user based on the provided user ID
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Retrieve subscriptions for the user
    List<Subscription> userSubscriptions = subscriptionRepository.findByUser(user);

    // Extract subjects from subscriptions
    List<SubjectDto> subjects = userSubscriptions.stream()
        .map(Subscription::getSubject)
        .map(subject -> modelMapper.map(subject, SubjectDto.class))
        .collect(Collectors.toList());

    return subjects;
  }
}
