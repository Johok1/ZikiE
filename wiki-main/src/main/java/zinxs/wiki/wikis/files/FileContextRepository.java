package zinxs.wiki.wikis.files;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.wikis.pages.Page;

import java.io.File;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface FileContextRepository extends JpaRepository<FileContext, Long> {
    Optional<FileContext> findById(Long id);
}
