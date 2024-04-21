package zinxs.wiki.pages;

import lombok.Getter;
import lombok.Setter;
import zinxs.wiki.accounts.WixAccount;
import zinxs.wiki.images.Image;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
public class Page implements Serializable {
    @SequenceGenerator(
            name = "page_sequence",
            sequenceName = "page_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "page_sequence"
    )
    private Long id;

    private WixAccount creator;

    private String imgUrl;

    private String email;
    @Column(columnDefinition="text", length=10485760)
    private String pageContent;
    private ArrayList<String> bannedAccounts;
    private ArrayList<String> editAccessAccounts;
    private ArrayList<String> internalTags;

    private ArrayList<String> imageContext;

    private ArrayList<String> videoContext;

    private ArrayList<Image> imageObjs;

    private boolean status;
    private String name;

    public Page(){
        this.bannedAccounts = new ArrayList<>();
        this.editAccessAccounts = new ArrayList<>();
        this.internalTags = new ArrayList<>();
        this.status = true;
        this.imageContext = new ArrayList<>();
        this.videoContext = new ArrayList<>();
        this.imageObjs = new ArrayList<>();
    }
}
