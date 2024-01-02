package zinxs.wiki.admin.projectmanager.project.phase.task.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.Message;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<Message> findById(Long id);
}