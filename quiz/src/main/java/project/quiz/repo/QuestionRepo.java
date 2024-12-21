package project.quiz.repo;

import project.quiz.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;


public interface QuestionRepo extends JpaRepository<QuizQuestion,Long> {
}
