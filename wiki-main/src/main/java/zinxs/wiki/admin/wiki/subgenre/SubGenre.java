package zinxs.wiki.admin.wiki.subgenre;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.wikis.community.CommunityWiki;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.pages.Page;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class SubGenre {

    @SequenceGenerator(
            name = "sub_genre_sequence",
            sequenceName = "sub_genre_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "sub_genre_sequence"
    )
    private Long id;

    private String subGenreName;

    private ArrayList<CommunityWiki> communityWikiList;

    private ArrayList<Wiki> wikiList;

    private ArrayList<Page> pageList;

    private boolean isTopGenre;

}