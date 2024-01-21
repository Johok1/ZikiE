package zinxs.wiki.wikis.searchtags;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SearchTag implements Serializable {
    @SequenceGenerator(
            name = "search_tag_sequence",
            sequenceName = "search_tag_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "search_tag_sequence"
    )
    private Long id;

    private String name;

    public SearchTag(String name){
        this.name = name;
    }
}
