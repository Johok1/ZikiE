package zinxs.wiki.admin.projectmanager.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.account.Account;
import zinxs.wiki.admin.projectmanager.project.phase.Phase;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Project implements Serializable {

    @SequenceGenerator(
            name = "project_sequence",
            sequenceName = "project_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "project_sequence"
    )
    private Long id;

    private Account creator;

    private String name;

    private ArrayList<Phase> phaseList;


    public Project(Account creator, String projectName){
        this.name = projectName;
        this.creator = creator;
        this.phaseList = new ArrayList<>();
    }
}
