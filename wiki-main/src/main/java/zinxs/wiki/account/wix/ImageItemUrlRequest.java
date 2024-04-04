package zinxs.wiki.account.wix;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.io.File;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageItemUrlRequest {
    private final byte[] file;

    private final String filename;
    private final String blank;
}