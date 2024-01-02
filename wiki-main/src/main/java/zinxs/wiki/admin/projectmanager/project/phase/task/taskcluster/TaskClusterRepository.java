package zinxs.wiki.admin.projectmanager.project.phase.task.taskcluster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.admin.projectmanager.project.phase.Phase;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TaskClusterRepository extends JpaRepository<TaskCluster, Long> {
    Optional<TaskCluster> findById(Long id);

    Optional<List<TaskCluster>> findByName(String name);
}

