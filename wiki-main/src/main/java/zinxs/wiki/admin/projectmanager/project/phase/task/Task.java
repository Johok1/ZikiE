package zinxs.wiki.admin.projectmanager.project.phase.task;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.Message;
import zinxs.wiki.admin.projectmanager.project.phase.task.research.Research;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task implements Serializable {

    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_sequence"
    )
    private Long id;
    private String taskName;

    @Column(columnDefinition="text", length=10485760)
    private String taskDescription;
    private ArrayList<Research> researchList;
    private ArrayList<Message> generalMessageList;

    public Task(String taskName){
        this.taskName = taskName;
        this.researchList = new ArrayList<>();
        this.generalMessageList = new ArrayList<>();
    }

    @Override
    public String toString(){
        return this.id+"*"+this.taskName;
    }


}
