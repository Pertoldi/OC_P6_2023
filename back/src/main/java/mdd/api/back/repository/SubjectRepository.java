package mdd.api.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mdd.api.back.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

}
