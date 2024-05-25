package zinxs.wiki.accountsapi.google;

import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRole;

import javax.persistence.*;

@Entity
public class GoogleAccount extends Account {



    public GoogleAccount(String username,
                         String email,
                         AccountRole accountRole){
        super(username, email, "" , accountRole);

    }
}
