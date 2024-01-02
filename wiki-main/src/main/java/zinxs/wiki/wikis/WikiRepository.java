package zinxs.wiki.wikis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.wikis.pages.Page;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface WikiRepository extends JpaRepository<Wiki, Long> {

    Optional<List<Wiki>> findByEmail(String email);

    Optional<Wiki> findById(Long id);

}