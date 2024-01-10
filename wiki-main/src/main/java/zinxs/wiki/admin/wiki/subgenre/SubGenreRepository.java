package zinxs.wiki.admin.wiki.subgenre;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.admin.wiki.Genre;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface SubGenreRepository extends JpaRepository<SubGenre,Long> {

    Optional<SubGenre> findById(Long id);


}
