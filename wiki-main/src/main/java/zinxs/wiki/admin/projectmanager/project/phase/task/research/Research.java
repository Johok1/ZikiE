package zinxs.wiki.admin.projectmanager.project.phase.task.research;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.Message;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Research implements Serializable {

    @SequenceGenerator(
            name = "research_sequence",
            sequenceName = "research_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "research_sequence"
    )
    private Long id;
    private String researchName;
    private ArrayList<Message> messageList;

    public Research(String researchName){
        this.researchName = researchName;
        this.messageList = new ArrayList<>();
    }

}
