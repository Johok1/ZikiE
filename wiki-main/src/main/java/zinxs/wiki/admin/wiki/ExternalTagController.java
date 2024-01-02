package zinxs.wiki.admin.wiki;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/tag")
@AllArgsConstructor
public class ExternalTagController {

    private final ExternalTagService externalTagService;

    @CrossOrigin
    @GetMapping("/getExternalTags")
    public String getExternalTags(){
        return externalTagService.getExternalTags();
    }

    @CrossOrigin
    @PostMapping("addExternalTag/{token}/{tag}")
    public String addExternalTag(@PathVariable String token, @PathVariable String tag){
        return externalTagService.addTag(token,tag);
    }

    @CrossOrigin
    @PostMapping("removeExternalTag/{token}/{tag}")
    public String removeExternalTag(@PathVariable String token, @PathVariable String tag){
        return  externalTagService.removeTag(token,tag);
    }

    @CrossOrigin
    @GetMapping("getStatus/{token}/{tag}")
    public String getStatus(@PathVariable String token, @PathVariable String tag){
        return externalTagService.getStatus(token, tag);
    }

    @CrossOrigin
    @PostMapping("/setStatus/{token}/{tag}/{status}")
    public String setStatus(@PathVariable String token, @PathVariable String tag, @PathVariable
                             String status){
        return externalTagService.setStatus(token,tag,status);
    }

}
