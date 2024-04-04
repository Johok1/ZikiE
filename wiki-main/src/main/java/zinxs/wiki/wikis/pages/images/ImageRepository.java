package zinxs.wiki.wikis.pages.images;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.wikis.pages.Page;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findById(Long id);

}

