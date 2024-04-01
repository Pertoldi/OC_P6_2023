package mdd.api.back.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mdd.api.back.dto.SubjectDto;
import mdd.api.back.dto.UserDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponse {
  private Integer id;
  private String title;
  private String content;
  private UserDto author;
  private SubjectDto subject;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private List<CommentResponse> comments;

  public ArticleResponse setAuthor(UserDto author) {
    this.author = author;
    return this;
  }

  public ArticleResponse setSubject(SubjectDto subject) {
    this.subject = subject;
    return this;
  }

  public ArticleResponse setComments(List<CommentResponse> commentResponses) {
    this.comments = commentResponses;
    return this;
  }
}
