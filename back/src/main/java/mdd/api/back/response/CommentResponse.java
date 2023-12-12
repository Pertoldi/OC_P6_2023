package mdd.api.back.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mdd.api.back.dto.UserDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {

  private Integer id;
  private String content;
  private UserDto author;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

}