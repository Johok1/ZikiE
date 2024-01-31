package zinxs.wiki.wikis.files.categories;

import lombok.Getter;
import lombok.Setter;
import zinxs.wiki.wikis.pages.Page;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Getter
@Setter
public class Category {

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

    private String name;

    private ArrayList<Page> pageList;

    public Category(){
        this.pageList = new ArrayList<>();
    }
}
