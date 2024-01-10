package zinxs.wiki.admin.wiki;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface GenreRepository extends JpaRepository<Genre, Long> {
        Optional<Genre> findById(Long id);

        Optional<Genre> findByGenreName(String genreName);

}