package mdd.api.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mdd.api.back.dto.SubscriptionDto;
import mdd.api.back.model.Subject;
import mdd.api.back.model.Subscription;
import mdd.api.back.model.SubscriptionId;
import mdd.api.back.model.User;
import mdd.api.back.repository.SubscriptionRepository;
import mdd.api.back.repository.UserRepository;

@Service
@AllArgsConstructor
public class SubscriptionService {
  private final SubscriptionRepository subscriptionRepository;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;
  private final SubjectService subjectService;

  @PostConstruct
  public void configureModelMapper() {
    modelMapper.createTypeMap(Subscription.class, SubscriptionDto.class)
        .addMapping(src -> src.getUser().getId(), SubscriptionDto::setUserId)
        .addMapping(src -> src.getSubject().getId(), SubscriptionDto::setSubjectId);

  }

  private SubscriptionDto mapToSubscriptionDto(Subscription subscription) {
    return modelMapper.map(subscription, SubscriptionDto.class);
  }

  public List<SubscriptionDto> getAllSubscriptions() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    List<Subscription> userSubscriptions = subscriptionRepository.findByUser(user);

    return userSubscriptions.stream()
        .map(this::mapToSubscriptionDto)
        .collect(Collectors.toList());
  }

  public SubscriptionDto create(Integer subjectId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    Subscription newSubscription = new Subscription();
    Subject subject = modelMapper.map(subjectService.getById(subjectId), Subject.class);
    newSubscription.setUser(user);
    newSubscription.setSubject(subject);
    Subscription savedSubscription = subscriptionRepository.save(newSubscription);
    return mapToSubscriptionDto(savedSubscription);
  }

  public void delete(Integer subjectId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    SubscriptionId subscriptionId = new SubscriptionId();
    subscriptionId.setUser(user.getId());
    subscriptionId.setSubject(subjectId);
    subscriptionRepository.deleteById(subscriptionId);
  }
}
