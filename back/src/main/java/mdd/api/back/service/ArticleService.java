package mdd.api.back.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mdd.api.back.dto.ArticleDto;
import mdd.api.back.dto.SubjectDto;
import mdd.api.back.dto.UserDto;
import mdd.api.back.model.Article;
import mdd.api.back.model.Subject;
import mdd.api.back.model.User;
import mdd.api.back.repository.ArticleRepository;
import mdd.api.back.repository.UserRepository;
import mdd.api.back.request.ArticleRequest;
import mdd.api.back.response.ArticleResponse;
import mdd.api.back.response.CommentResponse;

@Service
@AllArgsConstructor
public class ArticleService {

  private final ArticleRepository articleRepository;
  private final UserRepository userRepository;
  private final SubjectService subjectService;
  private final UserService userService;
  private final ModelMapper modelMapper;

  @PostConstruct
  public void configureModelMapper() {
    modelMapper.createTypeMap(Article.class, ArticleDto.class)
        .addMapping(src -> src.getAuthor().getId(), ArticleDto::setAuthorId)
        .addMapping(src -> src.getSubject().getId(), ArticleDto::setSubjectId);

  }

  private ArticleDto mapToArticleDto(Article article) {
    return modelMapper.map(article, ArticleDto.class);
  }

  public ArticleDto create(ArticleRequest articleRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    Subject subject = modelMapper.map(subjectService.getSubject(articleRequest.getSubjectId()), Subject.class);
    if (subject == null) {
      throw new RuntimeException("Subject not found");
    }

    Article newArticle = new Article();
    newArticle.setTitle(articleRequest.getTitle());
    newArticle.setContent(articleRequest.getContent());
    newArticle.setSubject(subject);
    newArticle.setAuthor(user);

    Article savedArticle = articleRepository.save(newArticle);
    return mapToArticleDto(savedArticle);
  }

  public List<ArticleResponse> getAllArticlesWithDetails() {
    List<Article> articles = articleRepository.findAll();
    List<ArticleResponse> articleResponseArticleResponses = new ArrayList<>();

    for (Article article : articles) {
      ArticleResponse articleResponseArticleResponse = mapArticleToDto(article);
      articleResponseArticleResponses.add(articleResponseArticleResponse);
    }

    return articleResponseArticleResponses;
  }

  public ArticleResponse getArticleById(Integer id) {
    Optional<Article> articleOptional = articleRepository.findById(id);
    if (articleOptional.isPresent()) {
      Article article = articleOptional.get();
      return mapArticleToDto(article);
    } else {
      throw new RuntimeException("Article not found");
    }
  }

  private ArticleResponse mapArticleToDto(Article article) {
    SubjectDto subjectDto = subjectService.getSubject(article.getSubject().getId());
    UserDto userDto = userService.getUserById(article.getAuthor().getId());

    List<CommentResponse> commentResponses = article.getComments().stream()
        .map(comment -> {
          CommentResponse commentResponse = modelMapper.map(comment, CommentResponse.class);
          UserDto commentUserDto = userService.getUserById(comment.getAuthor().getId());
          commentResponse.setAuthor(commentUserDto);
          return commentResponse;
        })
        .collect(Collectors.toList());

    return modelMapper.map(article, ArticleResponse.class)
        .setAuthor(userDto)
        .setSubject(subjectDto)
        .setComments(commentResponses);
  }
}