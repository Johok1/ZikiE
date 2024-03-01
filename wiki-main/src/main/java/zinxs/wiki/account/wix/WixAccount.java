package zinxs.wiki.account.wix;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import zinxs.wiki.wikis.pages.Page;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@Entity
public class WixAccount implements Serializable {


    @SequenceGenerator(
            name = "wix_account_sequence",
            sequenceName = "wix_account_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "wix_account_sequence"
    )
    private Long id;

    private ArrayList<Page> pages;

    private String wixCode;

    public WixAccount(){
        this.pages = new ArrayList<>();
    }
    public WixAccount(String wixCode){
        this.wixCode = wixCode;
        this.pages = new ArrayList<>();
    }



}
