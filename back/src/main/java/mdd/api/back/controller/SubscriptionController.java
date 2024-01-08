package mdd.api.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import mdd.api.back.dto.SubscriptionDto;
import mdd.api.back.request.SubscriptionRequest;
import mdd.api.back.response.SubscriptionResponseDto;
import mdd.api.back.service.SubscriptionService;

@RestController
@RequestMapping("/api/subscription")
@AllArgsConstructor
public class SubscriptionController {

  private final SubscriptionService subscriptionService;

  @GetMapping()
  public ResponseEntity<List<SubscriptionDto>> getAllSubscriptions() {
    List<SubscriptionDto> subscriptions = subscriptionService.getAllSubscriptions();
    return ResponseEntity.ok(subscriptions);
  }

  @PostMapping()
  public ResponseEntity<SubscriptionDto> subscribe(@RequestBody SubscriptionRequest request) {
    SubscriptionDto subscriptionDto = subscriptionService.create(request.getSubjectId());
    return ResponseEntity.ok(subscriptionDto);
  }

  @DeleteMapping("{subjectId}")
  public ResponseEntity<SubscriptionResponseDto> unsubscribe(
      @PathVariable Integer subjectId) {
    subscriptionService.delete(subjectId);
    SubscriptionResponseDto responseDTO = SubscriptionResponseDto.builder()
        .message("Unsubscribed successfully")
        .build();
    return ResponseEntity.ok(responseDTO);
  }

}