package zinxs.wiki.wikis.community;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class CommunityWiki {

    @SequenceGenerator(
            name = "community_wiki_sequence",
            sequenceName = "page_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "community_wiki_sequence"
    )
    private Long id;

    private  String name;
}
