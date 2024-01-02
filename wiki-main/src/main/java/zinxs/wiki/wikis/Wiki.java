package zinxs.wiki.wikis;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.wikipage.WikiPage;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Getter
@Setter
public class Wiki {
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
    private String email;
    @Column(columnDefinition="text", length=10485760)
    private String pageContent;
    private ArrayList<String> bannedAccounts;
    private ArrayList<String> editAccessAccounts;
    private ArrayList<String> internalTags;

    private ArrayList<String> externalTags;

    private ArrayList<WikiPage> pages;

    public Wiki(){
        this.bannedAccounts = new ArrayList<>();
        this.editAccessAccounts = new ArrayList<>();
        this.internalTags = new ArrayList<>();
        this.pages = new ArrayList<>();
        this.externalTags = new ArrayList<>();
    }
}
