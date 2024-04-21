package zinxs.wiki.accounts;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface WixAccountRepository extends JpaRepository<WixAccount, Long> {

    Optional<WixAccount> findById(Long id);
    Optional<WixAccount> findByWixCode(String wixCode);
}
