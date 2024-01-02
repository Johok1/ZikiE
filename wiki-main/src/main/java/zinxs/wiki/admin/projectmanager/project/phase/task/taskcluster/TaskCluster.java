package zinxs.wiki.admin.projectmanager.project.phase.task.taskcluster;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.admin.projectmanager.project.phase.task.Task;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TaskCluster implements Serializable {

    @SequenceGenerator(
            name = "taskcluster_sequence",
            sequenceName = "taskcluster_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "taskcluster_sequence"
    )
    private Long id;


    private String name;
    private ArrayList<Task> taskList;


    public TaskCluster(String name){
        this.name = name;
        this.taskList = new ArrayList<>();
    }
}
