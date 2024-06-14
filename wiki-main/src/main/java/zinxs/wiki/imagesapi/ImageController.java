package zinxs.wiki.imagesapi;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.jsonobjects.ImageItemUrlRequest;
import zinxs.wiki.jsonobjects.ImageObjResponse;
import zinxs.wiki.jsonobjects.ImageUrlRequest;

import java.util.List;

@RestController
@RequestMapping(path = "image")

public class ImageController {

    private final ImageServiceInterface imageService;

    public ImageController(ImageServiceInterface imageService){
        this.imageService = imageService;
    }

    @CrossOrigin
    @GetMapping(value = "getPageImage/{pageId}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody Resource getPageImage(@PathVariable String pageId){
        return imageService.getPageImg(pageId);
    }

    @CrossOrigin
    @PostMapping("postPageImage/{memberId}/{pageId}/{filename}")
    public String postPageImage( @PathVariable String memberId, @PathVariable String pageId,@PathVariable String filename,
                                @RequestParam("file")MultipartFile file){
        return imageService.setPageImg(memberId, pageId,filename, file);
    }
    @CrossOrigin
    @GetMapping("getPageImageUrls/{pageId}")
    public List<ImageObjResponse> getPageImageUrls(@PathVariable String pageId){
        return imageService.getPageImageUrls(pageId);
    }
    @CrossOrigin
    @PostMapping("addPageImageUrl/{memberId}/{pageId}/{filename}")
    public String addPageImageUrl(@PathVariable String memberId, @PathVariable String pageId,
                                  @PathVariable String filename, @RequestBody MultipartFile file){
        return imageService.addPageImage(memberId, pageId,filename, file);
    }

}
