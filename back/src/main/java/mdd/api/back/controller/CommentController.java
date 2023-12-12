package mdd.api.back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mdd.api.back.request.CommentRequest;
import mdd.api.back.response.CommentResponse;
import mdd.api.back.service.CommentService;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {
  private final CommentService commentService;

  @PostMapping
  public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest commentRequest) {
    CommentResponse createdComment = commentService.create(commentRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
  }
}
