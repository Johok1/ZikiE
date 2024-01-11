package zinxs.wiki.admin.wiki;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.admin.wiki.subgenre.SubGenre;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity

@Getter
@Setter
public class Genre implements Serializable {

    @SequenceGenerator(
            name = "genre_sequence",
            sequenceName = "genre_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "genre_sequence"
    )
    private Long id;

    private String genreName;

    private boolean isTopGenre;

    private ArrayList<SubGenre> subGenreList;

    public Genre(){
        this.subGenreList = new ArrayList<>();
    }
}
