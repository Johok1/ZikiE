package zinxs.wiki.wikis.pages;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/page")
@AllArgsConstructor
public class PageController {

    private final PageService pageService;

    @CrossOrigin
    @PostMapping("/setPageContent/{token}/{pageId}")
    public String setPageContent(@PathVariable String token, @PathVariable String pageId, @RequestBody String content){
        return pageService.savePage(token,pageId,content);
    }

    @CrossOrigin
    @GetMapping("/getPageContent/{token}/{pageId}")
    public String getPageContent(@PathVariable String token, @PathVariable String pageId){
        return pageService.getPage(token, pageId);
    }

    @CrossOrigin
    @GetMapping("/getPages")
    public String getPages(){
        return pageService.dumpPages();
    }

    @CrossOrigin
    @GetMapping("newInternalTag/{token}/{pageId}/{tagName}")
    public String newInternalTag(@PathVariable String token, @PathVariable String pageId, @PathVariable
                                 String tagName){
        return pageService.newInternalTag(token, pageId, tagName);
    }

    @CrossOrigin
    @GetMapping("/newPage/{token}/{name}")
    public String newPage(@PathVariable String token, @PathVariable String name){
        String id = pageService.newPage(token, name);
        return id;
    }

    @CrossOrigin
    @GetMapping("/setBanUser/{token}/{pageId}/{username}")
    public String setBanUser(@PathVariable String token, @PathVariable String pageId,
                          @PathVariable String username){
        return pageService.setBanUser(token, pageId, username);
    }

    @CrossOrigin
    @GetMapping("setEditPerm/{token}/{pageId}/{username}")
    public String setEditPerm(@PathVariable String token, @PathVariable String pageId,
                           @PathVariable String username){
        return pageService.setEditPerm(token, pageId, username);
    }

    @CrossOrigin
    @GetMapping("removeBanUser/{token}/{pageId}/{username}")
    public String removeBanUser(@PathVariable String token, @PathVariable String pageId,
                                @PathVariable String username){
        return pageService.removeBanUser(token, pageId, username);
    }

    @CrossOrigin
    @GetMapping("removeEditPerm/{token}/{pageId}/{username}")
    public String removeEditPerm(@PathVariable String token, @PathVariable String pageId,
                                 @PathVariable String username){
        return pageService.removeEditPerm(token, pageId, username);
    }

    @CrossOrigin
    @GetMapping("dumpUsers/{token}")
    public String dumpUsers(@PathVariable String token){
        return pageService.dumpUsers(token);
    }

    @CrossOrigin
    @GetMapping("dumpPageTags/{token}/{pageId}")
    public String dumpPageTags(@PathVariable String token, @PathVariable String pageId){
        return pageService.dumpPageTags(token, pageId);
    }

    @CrossOrigin
    @GetMapping("checkUserBanned/{token}/{pageId}/{username}")
    public String checkUserBanned(@PathVariable String token, @PathVariable String pageId,
                                  @PathVariable String username){
        return pageService.checkUserBanned(token, pageId, username);
    }

    @CrossOrigin
    @GetMapping("checkUserEditPerms/{token}/{pageId}/{username}")
    public String checkUserEditPerms(@PathVariable String token, @PathVariable String pageId,
                                     @PathVariable String username){
        return pageService.checkUserEditPerms(token, pageId, username);
    }

    @CrossOrigin
    @GetMapping("getPageName/{token}/{pageId}")
    public String getPageName(@PathVariable String token, @PathVariable String pageId){
        return pageService.getPageName(token, pageId);
    }

    @CrossOrigin
    @GetMapping("getPageStatus/{token}/{pageId}")
    public String getPageStatus(@PathVariable String token, @PathVariable String pageId){
        return pageService.getPageStatus(token, pageId);
    }

    @CrossOrigin
    @PostMapping("togglePageStatus/{token}/{pageId}")
    public String togglePageStatus(@PathVariable String token, @PathVariable String pageId){
        return pageService.togglePageStatus(token, pageId);
    }

}
