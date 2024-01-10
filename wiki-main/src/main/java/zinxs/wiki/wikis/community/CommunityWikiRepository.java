package zinxs.wiki.wikis.community;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface CommunityWikiRepository extends JpaRepository<CommunityWiki, Long> {

}
