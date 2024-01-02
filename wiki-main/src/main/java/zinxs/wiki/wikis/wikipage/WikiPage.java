package zinxs.wiki.wikis.wikipage;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
public class WikiPage implements Serializable {
    @SequenceGenerator(
            name = "wikipage_sequence",
            sequenceName = "page_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "wikipage_sequence"
    )
    private Long id;
    private String email;
    @Column(columnDefinition="text", length=10485760)
    private String pageContent;
    private ArrayList<String> bannedAccounts;
    private ArrayList<String> editAccessAccounts;
    private ArrayList<String> internalTags;

    public WikiPage(){
        this.bannedAccounts = new ArrayList<>();
        this.editAccessAccounts = new ArrayList<>();
        this.internalTags = new ArrayList<>();
    }
}