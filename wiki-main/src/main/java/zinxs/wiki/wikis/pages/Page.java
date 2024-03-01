package zinxs.wiki.wikis.pages;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import zinxs.wiki.account.wix.WixAccount;

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


    private String email;
    @Column(columnDefinition="text", length=10485760)
    private String pageContent;
    private ArrayList<String> bannedAccounts;
    private ArrayList<String> editAccessAccounts;
    private ArrayList<String> internalTags;

    private ArrayList<String> imageContext;

    private ArrayList<String> videoContext;

    private boolean status;
    private String name;

    public Page(){
        this.bannedAccounts = new ArrayList<>();
        this.editAccessAccounts = new ArrayList<>();
        this.internalTags = new ArrayList<>();
        this.status = true;
        this.imageContext = new ArrayList<>();
        this.videoContext = new ArrayList<>();
    }
}
