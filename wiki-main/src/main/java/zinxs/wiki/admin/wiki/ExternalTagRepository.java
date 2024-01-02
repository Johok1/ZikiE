package zinxs.wiki.admin.wiki;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface ExternalTagRepository extends JpaRepository<ExternalTag, Long> {
        Optional<ExternalTag> findById(Long id);

        Optional<ExternalTag> findByTagName(String tagName);

}