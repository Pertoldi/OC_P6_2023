package mdd.api.back.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mdd.api.back.model.Comment;
import mdd.api.back.model.User;
import mdd.api.back.repository.ArticleRepository;
import mdd.api.back.repository.CommentRepository;
import mdd.api.back.repository.UserRepository;
import mdd.api.back.request.CommentRequest;
import mdd.api.back.response.CommentResponse;

@Service
@RequiredArgsConstructor
public class CommentService {
  private final CommentRepository commentRepository;
  private final ArticleRepository articleRepository;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  public CommentResponse create(CommentRequest commentRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    Comment newComment = new Comment();
    newComment.setContent(commentRequest.getContent());
    newComment.setArticle(articleRepository.findById(commentRequest.getArticleId())
        .orElseThrow(() -> new RuntimeException("Article not found")));

    newComment.setAuthor(user);

    Comment savedComment = commentRepository.save(newComment);
    return modelMapper.map(savedComment, CommentResponse.class);
  }
}