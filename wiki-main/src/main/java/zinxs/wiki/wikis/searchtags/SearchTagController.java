package zinxs.wiki.wikis.searchtags;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/searchtag")
@AllArgsConstructor
public class SearchTagController {
    public final SearchTagService searchTagService;


    @CrossOrigin
    @GetMapping("/getAllSearchTags")
    public String getAllSearchTags(){
        return searchTagService.getAllSearchTags();
    }

    @CrossOrigin
    @PostMapping("/newSearchTag/{token}/{name}")
    public String newSearchTag(@PathVariable String token, @PathVariable String name){
        return searchTagService.newSearchTag(token, name);
    }

    @CrossOrigin
    @PostMapping("/removeSearchTag/{token}/{searchTagId}")
    public String removeSearchTag(@PathVariable String token, @PathVariable String
                                  searchTagId){
        return searchTagService.removeSearchTag(token, searchTagId);
    }


}
