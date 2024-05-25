package zinxs.wiki.accountsapi.google;

import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRole;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

public class GoogleAccount extends Account {

    @SequenceGenerator(
            name = "google_account_sequence",
            sequenceName = "google_account_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "google_account_sequence"
    )
    private Long id;
    private String googleToken;
    public GoogleAccount(String username,
                         String email,
                         String googleToken,
                         AccountRole accountRole){
        super(username, email, googleToken, accountRole);
        this.googleToken = googleToken;
    }
}
