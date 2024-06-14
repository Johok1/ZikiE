package zinxs.wiki.imagesapi;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.jsonobjects.ImageItemUrlRequest;
import zinxs.wiki.jsonobjects.ImageObjResponse;

import java.util.List;

public interface ImageServiceInterface {


    List<ImageObjResponse> getPageImageUrls(String pageId);


    String addPageImage(String memberId, String pageId, String filename, MultipartFile file);

    Resource getPageImg(String pageId);

    String setPageImg(String token, String pageId, String fileName, MultipartFile multipartFile);
}
