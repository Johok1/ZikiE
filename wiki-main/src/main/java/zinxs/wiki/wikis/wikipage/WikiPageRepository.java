package zinxs.wiki.wikis.wikipage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.wikis.pages.Page;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface WikiPageRepository extends JpaRepository<WikiPage, Long> {

    Optional<List<WikiPage>> findByEmail(String email);

    Optional<WikiPage> findById(Long id);

}