package mdd.api.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mdd.api.back.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

  @Query("SELECT a FROM Article a LEFT JOIN FETCH a.comments WHERE a.id = :id")
  Optional<Article> findByIdWithComments(@Param("id") Integer id);

}