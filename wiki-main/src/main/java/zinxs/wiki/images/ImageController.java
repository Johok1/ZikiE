package zinxs.wiki.images;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zinxs.wiki.reactobjects.ImageItemUrlRequest;
import zinxs.wiki.reactobjects.ImageObjResponse;
import zinxs.wiki.reactobjects.ImageUrlRequest;

import java.util.List;

@RestController
@RequestMapping(path = "image")
@AllArgsConstructor
public class ImageController {

    private final ImageService imageService;  

    @CrossOrigin
    @GetMapping("getPageImage/{pageId}")
    public String getPageImage(@PathVariable String pageId){
        return imageService.getPageImg(pageId);
    }

    @CrossOrigin
    @PostMapping("postPageImage/{memberId}/{pageId}")
    public String postPageImage(@PathVariable String memberId, @PathVariable String pageId,
                                @RequestBody ImageUrlRequest request){
        return imageService.setPageImg(memberId, pageId, request);
    }
    @CrossOrigin
    @GetMapping("getPageImageUrls/{pageId}")
    public List<ImageObjResponse> getPageImageUrls(@PathVariable String pageId){
        return imageService.getPageImageUrls(pageId);
    }
    @CrossOrigin
    @PostMapping("addPageImageUrl/{memberId}/{pageId}")
    public String addPageImageUrl(@PathVariable String memberId, @PathVariable String pageId,
                                  @RequestBody ImageItemUrlRequest request){
        return imageService.addPageImage(memberId, pageId, request);
    }

}
