package zinxs.wiki.accounts;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import zinxs.wiki.pages.Page;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

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
