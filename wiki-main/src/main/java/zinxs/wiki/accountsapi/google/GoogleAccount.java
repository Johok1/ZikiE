package zinxs.wiki.accountsapi.google;

import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRole;

public class GoogleAccount extends Account {
    private String googleToken;
    public GoogleAccount(String username,
                         String email,
                         String googleToken,
                         AccountRole accountRole){
        super(username, email, googleToken, accountRole);
        this.googleToken = googleToken;
    }
}
