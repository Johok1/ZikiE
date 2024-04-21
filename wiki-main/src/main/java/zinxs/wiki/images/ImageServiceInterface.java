package zinxs.wiki.images;

import zinxs.wiki.reactobjects.ImageItemUrlRequest;
import zinxs.wiki.reactobjects.ImageObjResponse;
import zinxs.wiki.reactobjects.ImageUrlRequest;

import java.util.List;

public interface ImageServiceInterface {


    List<ImageObjResponse> getPageImageUrls(String pageId);
    String addPageImage(String memberId, String pageId, ImageItemUrlRequest request);
    String getPageImg(String pageId);
    String setPageImg(String memberId, String pageId, ImageUrlRequest request);
}
