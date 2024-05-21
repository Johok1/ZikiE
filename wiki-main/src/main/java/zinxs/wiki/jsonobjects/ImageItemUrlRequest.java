package zinxs.wiki.jsonobjects;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageItemUrlRequest {
    private final byte[] file;

    private final String filename;
    private final String blank;
}