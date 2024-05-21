package zinxs.wiki.imagesapi;

import zinxs.wiki.jsonobjects.ImageItemUrlRequest;
import zinxs.wiki.jsonobjects.ImageObjResponse;
import zinxs.wiki.jsonobjects.ImageUrlRequest;

import java.util.List;

public interface ImageServiceInterface {


    List<ImageObjResponse> getPageImageUrls(String pageId);
    String addPageImage(String memberId, String pageId, ImageItemUrlRequest request);
    String getPageImg(String pageId);
    String setPageImg(String memberId, String pageId, ImageUrlRequest request);
}
