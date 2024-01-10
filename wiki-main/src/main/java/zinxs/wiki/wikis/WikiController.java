package zinxs.wiki.wikis;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zinxs.wiki.account.Account;
import zinxs.wiki.wikis.pages.PageService;


@RestController
@RequestMapping(path = "api/v1/wiki")
@AllArgsConstructor
public class WikiController {

    private final WikiService wikiService;


    @CrossOrigin
    @GetMapping("/hasAccess/{token}/{wikiId}")
    public String hasAccess(@PathVariable String token, @PathVariable String wikiId){
        try{
            return wikiService.hasAccess(token, wikiId);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @CrossOrigin
    @PostMapping("/getWikiGenres/{token}/{wikiId}")
    public String getWikiGenres(@PathVariable String token, @PathVariable String wikiId){
        return wikiService.getWikiGenres(token,wikiId);
    }
    @CrossOrigin
    @PostMapping("/addWikiGenre/{token}/{wikiId}/{tag}")
    public String addWikiGenres(@PathVariable String token, @PathVariable String wikiId,
                                      @PathVariable String tag){
        return wikiService.addWikiGenre(token,wikiId,tag);
    }
    @CrossOrigin
    @PostMapping("/removeWikiGenre/{token}/{wikiId}/{tag}")
    public String removeWikiGenres(@PathVariable String token, @PathVariable String wikiId,
                                      @PathVariable String tag){
        return wikiService.removeWikiGenre(token,wikiId,tag);
    }


    @CrossOrigin
    @PostMapping("/newWiki/{tempToken}")
    public String newWiki(@PathVariable String tempToken){
       return wikiService.newWiki(tempToken);
    }

    @CrossOrigin
    @PostMapping("/newWikiPage/{tempToken}/{wikiId}")
    public String newWikiPage(@PathVariable  String tempToken, @PathVariable String wikiId){
        return wikiService.newWikiPage(tempToken,wikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiTag/{tempToken}/{wikiId}/{tag}")
    public String addWikiTag(@PathVariable String tempToken, @PathVariable  String wikiId,
                             @PathVariable String tag){
        return wikiService.addWikiTag(tempToken,wikiId,tag);
    }

    @CrossOrigin
    @PostMapping("/removeWikiPageTag/{tempToken}/{wikiId}/{wikiPageId}/{tag}")
    public String removeWikiPageTag(@PathVariable String tempToken, @PathVariable  String wikiId,
                             @PathVariable String wikiPageId, @PathVariable String tag){
        return wikiService.removeWikiPageTag(tempToken,wikiId, wikiPageId, tag);
    }

    @CrossOrigin
    @PostMapping("/addWikiPageTag/{tempToken}/{wikiId}/{wikiPageId}/{tag}")
    public String addWikiPageTag(@PathVariable String tempToken, @PathVariable  String wikiId,
                                 @PathVariable String wikiPageId, @PathVariable String tag){
        return wikiService.addWikiPageTag(tempToken,wikiId,wikiPageId,tag);
    }

    @CrossOrigin
    @GetMapping("/getWikiPageTags/{tempToken}/{wikiId}/{wikiPageId}")
    public String getWikiPageTags(@PathVariable String tempToken, @PathVariable String wikiId,
                                  @PathVariable String wikiPageId){
        return wikiService.getWikiPageTags(tempToken, wikiId,wikiPageId);
    }

    @CrossOrigin
    @GetMapping("/getWikiTags/{tempToken}/{wikiId}")
    public String getWikiTags(@PathVariable String tempToken, @PathVariable String wikiId){
        return wikiService.getWikiTags(tempToken,wikiId);
    }

    @CrossOrigin
    @GetMapping("/getWikiPages/{tempToken}/{wikiId}")
    public String getWikiPages(@PathVariable String tempToken, @PathVariable String wikiId){
        return  wikiService.getWikiPages(tempToken,wikiId);
    }

    @CrossOrigin
    @GetMapping("/getWikiPage/{tempToken}/{wikiId}/{wikiPageId}")
    public String getWikiPage(@PathVariable String tempToken, @PathVariable String wikiId,
                              @PathVariable String wikiPageId){
        return wikiService.getWikiPage(tempToken,wikiId,wikiPageId);
    }

    @CrossOrigin
    @GetMapping("/setBanUser/{token}/{wikiId}/{username}")
    public String setBanUser(@PathVariable String token, @PathVariable String wikiId,
                             @PathVariable String username){
        return wikiService.setBanUser(token, wikiId, username);
    }

    @CrossOrigin
    @GetMapping("setEditPerm/{token}/{wikiId}/{username}")
    public String setEditPerm(@PathVariable String token, @PathVariable String wikiId,
                              @PathVariable String username){
        return wikiService.setEditPerm(token, wikiId, username);
    }

    @CrossOrigin
    @GetMapping("removeBanUser/{token}/{wikiId}/{username}")
    public String removeBanUser(@PathVariable String token, @PathVariable String wikiId,
                                @PathVariable String username){
        return wikiService.removeBanUser(token, wikiId, username);
    }

    @CrossOrigin
    @GetMapping("removeEditPerm/{token}/{wikiId}/{username}")
    public String removeEditPerm(@PathVariable String token, @PathVariable String wikiId,
                                 @PathVariable String username){
        return wikiService.removeEditPerm(token, wikiId, username);
    }

    @CrossOrigin
    @GetMapping("checkUserBanned/{token}/{wikiId}/{username}")
    public String checkUserBanned(@PathVariable String token, @PathVariable String wikiId,
                                  @PathVariable String username){
        return wikiService.checkUserBanned(token, wikiId, username);
    }

    @CrossOrigin
    @GetMapping("checkUserEditPerms/{token}/{wikiId}/{username}")
    public String checkUserEditPerms(@PathVariable String token, @PathVariable String wikiId,
                                     @PathVariable String username){
        return wikiService.checkUserEditPerms(token, wikiId, username);
    }

    @CrossOrigin
    @PostMapping("/setPageContent/{token}/{wikiId}/{wikiPageId}")
    public String setPageContent(@PathVariable String token, @PathVariable String wikiId,
                                 @PathVariable String wikiPageId, @RequestBody String content){
        return wikiService.setWikiPageContent(token,wikiId,wikiPageId,content);
    }

    @CrossOrigin
    @GetMapping("/getWikis")
    public String getWikis(){
        return wikiService.getWikis();
    }

}