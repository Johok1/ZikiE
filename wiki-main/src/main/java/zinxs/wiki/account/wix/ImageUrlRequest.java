package zinxs.wiki.account.wix;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter

@EqualsAndHashCode
@ToString
public class ImageUrlRequest {
    private String url;

    public ImageUrlRequest(String url){
        this.url = url ;
    }
}