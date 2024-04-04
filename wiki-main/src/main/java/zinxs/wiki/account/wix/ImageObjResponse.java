package zinxs.wiki.account.wix;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageObjResponse {
    private final String filename;
    private final String data;
}
