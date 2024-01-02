package zinxs.wiki.admin.projectmanager.project.phase.task.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Message implements Serializable {



    @SequenceGenerator(
            name = "message_sequence",
            sequenceName = "message_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "message_sequence"
    )
    private Long id;
    private String username;
    private String msg;

    private String type;

    @Lob
    private String imageLink;

    public Message(String username, String type){
        this.username = username;
        this.type = type;
    }


}
