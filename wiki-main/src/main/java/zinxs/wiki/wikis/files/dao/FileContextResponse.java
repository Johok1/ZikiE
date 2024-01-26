package zinxs.wiki.wikis.files.dao;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class FileContextResponse {

    String authorUsername;
    String pageId;
    byte[] authorImage;


}
