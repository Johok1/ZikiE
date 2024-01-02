package zinxs.wiki.admin.projectmanager;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "admin/projectmanager")
@AllArgsConstructor
public class ProjectManagerController {

    private final ProjectManagerService projectManagerService;


    @GetMapping("/getProjectList/{token}")
    @CrossOrigin
    public String getProjectList(@PathVariable String token){
        return projectManagerService.getProjectList(token);
    }
    @PostMapping("addProject/{token}/{name}")
    @CrossOrigin
    public String addProject(@PathVariable String token, @PathVariable String name){
        return projectManagerService.addProject(token, name);
    }

    @GetMapping("getPhaseList/{token}/{projectName}")
    @CrossOrigin
    public String getPhaseList(@PathVariable String token, @PathVariable String projectName){
        return projectManagerService.getPhaseList(token,projectName);
    }

    @PostMapping("deleteProject/{token}/{projectName}")
    @CrossOrigin
    public String deleteProject(@PathVariable String token, @PathVariable String projectName){
        return projectManagerService.deleteProject(token, projectName);
    }

    @PostMapping("addPhase/{token}/{projectName}/{phaseName}")
    @CrossOrigin
    public String addPhase(@PathVariable String token, @PathVariable String projectName, @PathVariable String
                           phaseName){
        return projectManagerService.addPhase(token, projectName, phaseName);
    }

    @PostMapping("editProject/{token}/{projectName}/{newName}")
    @CrossOrigin
    public String editProject(@PathVariable String token, @PathVariable String projectName, @PathVariable
                              String newName){
        return projectManagerService.editProject(token, projectName, newName);
    }

    @PostMapping("editPhase/{token}/{projectName}/{phaseName}/{newName}")
    @CrossOrigin
    public String editPhase(@PathVariable String token, @PathVariable String projectName,
                            @PathVariable String phaseName, @PathVariable String newName){
        return projectManagerService.editPhase(token, projectName, phaseName, newName);
    }

    @PostMapping("deletePhase/{token}/{projectName}/{phaseName}")
    @CrossOrigin
    public String deletePhase(@PathVariable String token, @PathVariable String projectName,
                              @PathVariable String phaseName){
        return projectManagerService.deletePhase(token, projectName, phaseName);
    }

    @GetMapping("getTaskList/{token}/{projectName}/{phaseName}/{taskCluster}")
    @CrossOrigin
    public String getTaskList(@PathVariable String token, @PathVariable String projectName,
                              @PathVariable String phaseName, @PathVariable String taskCluster){
        return projectManagerService.getTaskList(token, projectName, phaseName, taskCluster);
    }

    @GetMapping("getTaskClusterList/{token}/{projectName}/{phaseName}")
    @CrossOrigin
    public String getTaskList(@PathVariable String token, @PathVariable String projectName,
                              @PathVariable String phaseName){
        return projectManagerService.getTaskClusterList(token, projectName, phaseName);
    }

    @PostMapping("addTaskCluster/{token}/{projectName}/{phaseName}/{taskCluster}")
    @CrossOrigin
    public String addTaskCluster(@PathVariable String token, @PathVariable String projectName,
                          @PathVariable String phaseName,@PathVariable String taskCluster){
        return projectManagerService.addTaskCluster(token, projectName, phaseName, taskCluster);
    }

    @PostMapping("addTask/{token}/{projectName}/{phaseName}/{taskCluster}/{taskName}")
    @CrossOrigin
    public String addTask(@PathVariable String token, @PathVariable String projectName,
                          @PathVariable String phaseName,@PathVariable String taskCluster, @PathVariable String taskName){
        return projectManagerService.addTask(token, projectName, phaseName, taskCluster, taskName);
    }

    @PostMapping("deleteTask/{token}/{projectName}/{phaseName}/{taskCluster}/{taskName}")
    @CrossOrigin
    public String deleteTask(@PathVariable String token, @PathVariable String projectName,
                             @PathVariable String phaseName,@PathVariable String taskCluster, @PathVariable String taskName){
        return projectManagerService.removeTask(token, projectName,phaseName,taskCluster,taskName);
    }

    @PostMapping("editTask/{token}/{projectName}/{phaseName}/{taskCluster}/{taskName}/{newName}")
    @CrossOrigin
    public String editTask(@PathVariable String token, @PathVariable String projectName,
                           @PathVariable String phaseName,@PathVariable String taskCluster, @PathVariable String taskName,
                           @PathVariable String newName){
        return projectManagerService.editTask(token, projectName, phaseName, taskCluster, taskName, newName);
    }

}
