package zinxs.wiki.admin.projectmanager.project.phase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface PhaseRepository extends JpaRepository<Phase, Long> {
    Optional<Phase> findById(Long id);

    Optional<List<Phase>> findByName(String name);
}
