package zinxs.wiki.admin.projectmanager.project.phase.task.message;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class MessageResponse {
    String username;
    String message;
    String type;
    String id;
    String imageContent;
}

