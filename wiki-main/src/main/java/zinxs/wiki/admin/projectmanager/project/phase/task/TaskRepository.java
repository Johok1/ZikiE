package zinxs.wiki.admin.projectmanager.project.phase.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findById(Long id);
}

