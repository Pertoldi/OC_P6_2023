package mdd.api.back.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDto {
  private Integer userId;
  private Integer subjectId;
  private LocalDateTime createdAt;
}