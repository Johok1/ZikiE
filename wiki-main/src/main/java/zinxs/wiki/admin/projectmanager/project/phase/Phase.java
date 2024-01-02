package zinxs.wiki.admin.projectmanager.project.phase;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.admin.projectmanager.project.phase.task.Task;
import zinxs.wiki.admin.projectmanager.project.phase.task.taskcluster.TaskCluster;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Phase implements Serializable {

    @SequenceGenerator(
            name = "phase_sequence",
            sequenceName = "phase_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "phase_sequence"
    )
    private Long id;


    private String name;
    private ArrayList<TaskCluster> taskClusterList;


    public Phase(String name){
        this.name = name;
        this.taskClusterList = new ArrayList<>();
    }
}
