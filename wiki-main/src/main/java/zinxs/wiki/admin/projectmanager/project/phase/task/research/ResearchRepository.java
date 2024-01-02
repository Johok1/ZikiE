package zinxs.wiki.admin.projectmanager.project.phase.task.research;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.admin.projectmanager.project.phase.task.Task;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface ResearchRepository extends JpaRepository<Research, Long> {
    Optional<Research> findById(Long id);
}