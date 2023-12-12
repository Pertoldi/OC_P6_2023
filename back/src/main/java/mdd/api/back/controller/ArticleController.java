package mdd.api.back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mdd.api.back.dto.ArticleDto;
import mdd.api.back.request.ArticleRequest;
import mdd.api.back.response.ArticleResponse;
import mdd.api.back.service.ArticleService;

@RestController
@RequestMapping("/api/article")
@RequiredArgsConstructor
public class ArticleController {
  private final ArticleService articleService;

  @PostMapping
  public ResponseEntity<ArticleDto> create(@RequestBody ArticleRequest articleRequest) {
    System.out.println("articleRequest: " + articleRequest);
    ArticleDto createdArticle = articleService.create(articleRequest);
    return ResponseEntity.ok(createdArticle);
  }

  @GetMapping
  public ResponseEntity<List<ArticleResponse>> getAllArticles() {
    List<ArticleResponse> articles = articleService.getAllArticlesWithDetails();
    return new ResponseEntity<>(articles, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ArticleResponse> getArticleById(@PathVariable Integer id) {
    ArticleResponse article = articleService.getArticleById(id);
    if (article != null) {
      return new ResponseEntity<>(article, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
