package zinxs.wiki.wikis.files;


import lombok.Getter;
import lombok.Setter;
import zinxs.wiki.account.Account;
import zinxs.wiki.wikis.pages.Page;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class FileContext implements Serializable {
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

    private Account author;

    private Page parentPage;

    private String filename;

}
