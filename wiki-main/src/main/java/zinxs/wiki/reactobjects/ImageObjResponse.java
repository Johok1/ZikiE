package zinxs.wiki.reactobjects;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.io.File;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageObjResponse {
    private final String filename;
    private final byte[] file;
}
