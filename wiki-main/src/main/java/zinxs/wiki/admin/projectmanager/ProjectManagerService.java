package zinxs.wiki.admin.projectmanager;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.admin.projectmanager.project.Project;
import zinxs.wiki.admin.projectmanager.project.ProjectRepository;
import zinxs.wiki.admin.projectmanager.project.phase.Phase;
import zinxs.wiki.admin.projectmanager.project.phase.PhaseRepository;
import zinxs.wiki.admin.projectmanager.project.phase.task.Task;
import zinxs.wiki.admin.projectmanager.project.phase.task.TaskRepository;
import zinxs.wiki.admin.projectmanager.project.phase.task.taskcluster.TaskCluster;
import zinxs.wiki.admin.projectmanager.project.phase.task.taskcluster.TaskClusterRepository;
import zinxs.wiki.utilities.AuthTokenUtils;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProjectManagerService {

    private final ProjectRepository projectRepository;
    private final PhaseRepository phaseRepository;
    private  final TaskRepository taskRepository;

    private final AuthTokenUtils authTokenUtils;
    private  final  AccountRepository accountRepository;

    private final TaskClusterRepository taskClusterRepository;

    public String getProjectList(String token){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                List<Project> projects = projectRepository.findAll();
                String projectString = "";
                for(Project project : projects){
                    projectString += project.getName() + ",";
                }
                return projectString;
            }else{
                return "Access Denied";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addProject(String token, String projectName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                String email = authTokenUtils.decodeEmail(token);
                Project project = new Project(accountRepository.findByEmail(email).get(),projectName);
                projectRepository.save(project);
                return "true";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "An internal error has occurred";
        }
    }

    public String getPhaseList(String token, String projectName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                List<Phase> phaseList =projectRepository.findByName(projectName).get().get(0).getPhaseList();
                String phaseListStr = "";
                for(Phase phase : phaseList){
                    phaseListStr += phase.getName() + ",";
                }
                return phaseListStr;
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String deleteProject(String token, String projectName){
        try {
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                List<Project> projects = projectRepository.findByName(projectName).get();
                for(Project project : projects){
                    projectRepository.delete(project);
                }
                return "true";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String addPhase(String token, String projectName, String phaseName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                Phase phase = new Phase(phaseName);
                phaseRepository.save(phase);
                project.getPhaseList().add(phase);
                projectRepository.save(project);
                return "true";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){

            throw new RuntimeException(e);
        }
    }

    public String editProject(String token, String projectName, String newName) {
        try {
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                project.setName(newName);
                projectRepository.save(project);
                return "true";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String editPhase(String token, String projectName, String phaseName, String newName){
        try {
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        phase.setName(newName);
                        phaseRepository.save(phase);
                        projectRepository.save(project);
                        return "true";
                    }
                }
             return "false";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String deletePhase(String token, String projectName, String phaseName){
        try {
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        ArrayList<Phase> phases = project.getPhaseList();
                        phases.remove(phase);
                        project.setPhaseList(phases);
                        projectRepository.save(project);
                        phaseRepository.delete(phase);
                        return "true";
                    }
                }
                return "false";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String getTaskList(String token, String projectName, String phaseName, String taskCluster){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                       ArrayList<TaskCluster> taskClusters = phase.getTaskClusterList();
                       for(TaskCluster cluster: taskClusters){
                           if(cluster.getName().equals(taskCluster)){
                               ArrayList<Task> tasks = cluster.getTaskList();
                               String taskList =  "";
                               for(Task task : tasks){
                                   taskList += task.toString() + ",";
                               }
                               return taskList;
                           }
                       }
                    }
                }
                return "Could not find phase";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getTaskClusterList(String token, String projectName, String phaseName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        ArrayList<TaskCluster> taskClusters = phase.getTaskClusterList();
                        String taskClusterList =  "";
                        for(TaskCluster cluster: taskClusters){
                            taskClusterList += cluster.getName() + ",";

                        }
                        return taskClusterList;
                    }
                }
                return "Could not find phase";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addTaskCluster(String token, String projectName, String phaseName, String taskCluster){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        TaskCluster cluster = new TaskCluster(taskCluster);
                        phase.getTaskClusterList().add(cluster);
                        taskClusterRepository.save(cluster);
                        phaseRepository.save(phase);
                        projectRepository.save(project);
                        return "true";

                    }

                }
                return "Could not find phase";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String addTask(String token, String projectName, String phaseName, String taskCluster,
                          String taskName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        ArrayList<TaskCluster> taskClusters = phase.getTaskClusterList();
                        for(TaskCluster cluster : taskClusters){
                            if(cluster.getName().equals(taskCluster)){
                                Task task = new Task(taskName);
                                cluster.getTaskList().add(task);
                                taskClusterRepository.save(cluster);
                                taskRepository.save(task);
                                phaseRepository.save(phase);
                                projectRepository.save(project);
                                return String.valueOf(task.getId());
                            }

                        }

                    }

                }
                return "Could not find phase";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String editTask(String token, String projectName, String phaseName, String taskCluster,
                           String taskName, String newName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        ArrayList<TaskCluster> taskClusters = phase.getTaskClusterList();
                        for(TaskCluster cluster : taskClusters){
                            if(cluster.getName().equals(taskCluster)){
                                ArrayList<Task> tasks = cluster.getTaskList();
                                for(Task task: tasks){
                                    if(task.getTaskName().equals(taskName)){
                                        task.setTaskName(newName);
                                        //taskRepository.save(task);
                                        taskClusterRepository.save(cluster);
                                        phaseRepository.save(phase);
                                        projectRepository.save(project);
                                        return "true";
                                    }
                                }

                            }
                        }
                    }

                }
                return "Could not find phase/task";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    public String removeTask(String token, String projectName, String phaseName, String taskCluster,
                             String taskName){
        try{
            if(isAdmin(authTokenUtils.decodeEmail(token))){
                Project project = projectRepository.findByName(projectName).get().get(0);
                for(Phase phase : project.getPhaseList()){
                    if(phase.getName().equals(phaseName)){
                        ArrayList<TaskCluster> taskClusters = phase.getTaskClusterList();
                        for(TaskCluster cluster : taskClusters){
                            if(cluster.getName().equals(taskCluster)){
                                ArrayList<Task> tasks = cluster.getTaskList();
                                for(Task task: tasks){
                                    if(task.getTaskName().equals(taskName)){
                                        taskRepository.delete(task);
                                        cluster.getTaskList().remove(task);
                                        taskClusterRepository.save(cluster);
                                        phaseRepository.save(phase);
                                        projectRepository.save(project);
                                        return "true";
                                    }
                                }

                            }
                        }
                        }
                    }


                return "Could not find phase";
            }else {
                return "Access Denied";
            }
        }catch (Exception e){
            return "Internal error occurred";
        }
    }

    private boolean isAdmin(String email){
        if(email.equals("josh.hooks@hotmail.com")
            || email.equals("zinxshosting@gmail.com")
            || email.equals("jaydencantrelle@gmail.com")){
            return true;
        }else{
            return false;
        }
    }

}
