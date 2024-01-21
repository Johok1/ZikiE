package zinxs.wiki.wikis;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import zinxs.wiki.account.Account;
import zinxs.wiki.admin.wiki.subgenre.SubGenre;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.searchtags.SearchTag;


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
    private Account wikiCreator;
    @Column(columnDefinition="text", length=10485760)
    private String pageContent;
    private ArrayList<Account> bannedAccounts;
    private ArrayList<Account> editAccessAccounts;

    private ArrayList<SubGenre> subGenres;

    private ArrayList<SearchTag> searchTags;

    private ArrayList<String> categories;

    private String name;

    private byte[] img;

    private ArrayList<Page> pages;

    public Wiki(){
        this.bannedAccounts = new ArrayList<>();
        this.editAccessAccounts = new ArrayList<>();
        this.pages = new ArrayList<>();
        this.categories = new ArrayList<>();
        this.searchTags = new ArrayList<>();
        this.subGenres = new ArrayList<>();
    }
}
