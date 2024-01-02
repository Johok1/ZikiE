package zinxs.wiki.admin.projectmanager.project.phase.task;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.Message;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.MessageRepository;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.MessageRequest;
import zinxs.wiki.admin.projectmanager.project.phase.task.message.MessageResponse;
import zinxs.wiki.admin.projectmanager.project.phase.task.research.Research;
import zinxs.wiki.admin.projectmanager.project.phase.task.research.ResearchRepository;
import zinxs.wiki.utilities.AuthTokenUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {

    private  final TaskRepository taskRepository;

    private final AuthTokenUtils authTokenUtils;
    private  final AccountRepository accountRepository;

    private final ResearchRepository researchRepository;

    private final MessageRepository messageRepository;

    public String getTaskDesc(String token, String taskId){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            return task.getTaskDescription();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getUsername(String token){
        try{
            String email = authTokenUtils.decodeEmail(token);
            Account account = accountRepository.findByEmail(email).get();
            return account.getUsername();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public List<MessageResponse> getGeneralMessageList(String token, String taskId){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            List<Message> msgList = task.getGeneralMessageList();
            List<MessageResponse> returnList = new ArrayList<>();
            for(Message msg : msgList){
                MessageResponse response = new MessageResponse(msg.getUsername(),
                        msg.getMsg(),msg.getType(),
                        String.valueOf(msg.getId()),msg.getImageLink());
                returnList.add(response);
            }
            return returnList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String postGeneralMessage(String token, String taskId, MessageRequest messageRequest){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            Message msg = new Message(messageRequest.getUsername(),messageRequest.getType());
            if(messageRequest.getType().equalsIgnoreCase("string")){
                msg.setMsg(messageRequest.getMessage());
            }else if(messageRequest.getType().equalsIgnoreCase("image")){
                msg.setImageLink(messageRequest.getImageContent());
            }else{
                throw new RuntimeException("invalid message type: " + messageRequest.getType());
            }
            messageRepository.save(msg);
            ArrayList<Message> msgs = task.getGeneralMessageList();
            msgs.add(msg);
            task.setGeneralMessageList(msgs);
            taskRepository.save(task);
            return String.valueOf(msg.getId());
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getTaskResearchList(String token, String taskId){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            List<Research> researchList = task.getResearchList();
            String researchListStr = "";
            for(Research research : researchList){
                researchListStr += research.getResearchName() + ",";
            }
            return researchListStr;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String postNewResearch(String token, String taskId, String researchName){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            ArrayList<Research> researchList = task.getResearchList();
            Research research = new Research(researchName);
            researchList.add(research);
            task.setResearchList(researchList);
            taskRepository.save(task);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public List<MessageResponse> getResearchMessageList(String token, String taskId, String researchName){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            List<Research> researchList = task.getResearchList();
            for(Research research : researchList){
                if(research.getResearchName().equals(researchName)){
                    List<Message> researchMsgList = research.getMessageList();
                    List<MessageResponse> msgListStr = new ArrayList<>();
                    for(Message msg : researchMsgList){
                        MessageResponse response = new MessageResponse(msg.getUsername(),
                                msg.getMsg(), msg.getType(),
                                String.valueOf(msg.getId()), msg.getImageLink());
                        msgListStr.add(response);
                    }
                    return msgListStr;
                }
            }
            throw new Exception("no matching research name");
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String postResearchMessage(String token, String taskId, String researchName, MessageRequest msg){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            ArrayList<Research> researchList = task.getResearchList();
            Message message = new Message(msg.getUsername(),msg.getType());
            if(msg.getType().equalsIgnoreCase("string")){
                message.setMsg(msg.getMessage());
            }else if(msg.getType().equalsIgnoreCase("image")){
                message.setImageLink(msg.getImageContent());
            }else{
                throw new RuntimeException("invalid message type: " + msg.getType());
            }
            for(Research research : researchList) {
                if (research.getResearchName().equals(researchName)) {
                    ArrayList<Message> msgList = research.getMessageList();
                    msgList.add(message);
                    research.setMessageList(msgList);
                    researchRepository.save(research);
                }
            }
            messageRepository.save(message);
            task.setResearchList(researchList);
            taskRepository.save(task);
            return String.valueOf(message.getId());
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String postTaskDesc(String token, String taskId, DescriptionRequest description){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            task.setTaskDescription(description.getDesc());
            taskRepository.save(task);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String postDeleteResearch(String token, String taskId, String researchName){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            ArrayList<Research> researchList = task.getResearchList();
            for(Research research : researchList) {
                if (research.getResearchName().equals(researchName)) {
                    researchList.remove(research);
                    researchRepository.delete(research);
                    task.setResearchList(researchList);
                    taskRepository.save(task);
                    return "true";
                }
            }
            throw new Exception("no research of name " + researchName + "associated with task " + taskId);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String postEditResearch(String token, String taskId, String researchName, String newName){
        try{
            Task task = taskRepository.findById(Long.valueOf(taskId)).get();
            ArrayList<Research> researchList = task.getResearchList();
            for(Research research : researchList) {
                if (research.getResearchName().equals(researchName)) {
                    research.setResearchName(newName);
                    task.setResearchList(researchList);
                    taskRepository.save(task);
                    return "true";
                }
            }
            throw new Exception("no research of name " + researchName + "associated with task " + taskId);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
