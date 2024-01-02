package zinxs.wiki.admin.projectmanager.project.phase.task;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.MessageRequest;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.MessageResponse;

import java.util.List;

@RestController
@RequestMapping(path = "admin/projectmanager/taskpage")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @CrossOrigin
    @GetMapping("getTaskDesc/{token}/{taskId}")
    public String getTaskDesc(@PathVariable String token,@PathVariable String taskId){
        return taskService.getTaskDesc(token, taskId);
    }

    @CrossOrigin
    @PostMapping("postTaskDesc/{token}/{taskId}")
    public String postTaskDesc(@PathVariable String token, @PathVariable String taskId,
                               @RequestBody DescriptionRequest descriptionRequest){
        return taskService.postTaskDesc(token, taskId, descriptionRequest);
    }

    @CrossOrigin
    @GetMapping("getGeneralMsgList/{token}/{taskId}")
    public List<MessageResponse> getGeneralMessageList(@PathVariable String token, @PathVariable String taskId){
        return taskService.getGeneralMessageList(token, taskId);
    }
    @CrossOrigin
    @GetMapping("getUsername/{token}")
    public String getUsername(@PathVariable String token){
        return taskService.getUsername(token);
    }

    @CrossOrigin
    @PostMapping("postGeneralMsg/{token}/{taskId}")
    public String postGeneralMessage(@PathVariable String token, @PathVariable String taskId,
                                     @RequestBody MessageRequest messageRequest){
        return taskService.postGeneralMessage(token, taskId, messageRequest);
    }

    @CrossOrigin
    @GetMapping("getResearchList/{token}/{taskId}")
    public String getResearchList(@PathVariable String token, @PathVariable String taskId){
        return taskService.getTaskResearchList(token, taskId);
    }

    @CrossOrigin
    @PostMapping("postNewResearch/{token}/{taskId}/{name}")
    public String postNewResearch(@PathVariable String token, @PathVariable String taskId, @PathVariable
                                  String name){
        return taskService.postNewResearch(token, taskId, name);
    }

    @CrossOrigin
    @GetMapping("getResearchMsgList/{token}/{taskId}/{researchName}")
    public List<MessageResponse> getResearchMessageList(@PathVariable String token, @PathVariable String taskId,
                                         @PathVariable String researchName){
        return taskService.getResearchMessageList(token, taskId, researchName);
    }

    @CrossOrigin
    @PostMapping("postResearchMsg/{token}/{taskId}/{researchName}")
    public String postResearchMessage(@PathVariable String token, @PathVariable String taskId,
                                      @PathVariable String researchName, @RequestBody MessageRequest
                                      messageRequest){
        return taskService.postResearchMessage(token, taskId, researchName, messageRequest);
    }

    @CrossOrigin
    @PostMapping("deleteResearch/{token}/{taskId}/{researchName}")
    public String deleteResearch(@PathVariable String token, @PathVariable String taskId,
                                 @PathVariable String researchName){
        return taskService.postDeleteResearch(token, taskId, researchName);
    }

    @CrossOrigin
    @PostMapping("editResearch/{token}/{taskId}/{researchName}/{newName}")
    public String editResearch(@PathVariable String token, @PathVariable String taskId, @PathVariable String
                  researchName, @PathVariable String newName){
        return taskService.postEditResearch(token, taskId, researchName, newName);
    }


}
