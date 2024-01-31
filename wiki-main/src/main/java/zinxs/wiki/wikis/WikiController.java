package zinxs.wiki.wikis;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    @GetMapping("/getWikiSubGenres/{token}/{wikiId}")
    public String getWikiSubGenres(@PathVariable String token, @PathVariable String wikiId){
        return wikiService.getWikiSubGenres(token,wikiId);
    }
    @CrossOrigin
    @PostMapping("/addWikiSubGenre/{token}/{wikiId}/{subGenreId}")
    public String addWikiGenres(@PathVariable String token, @PathVariable String wikiId,
                                      @PathVariable String subGenreId){
        return wikiService.addWikiSubGenre(token,wikiId,subGenreId);
    }
    @CrossOrigin
    @PostMapping("/removeWikiSubGenre/{token}/{wikiId}/{subGenreId}")
    public String removeWikiGenres(@PathVariable String token, @PathVariable String wikiId,
                                      @PathVariable String subGenreId){
        return wikiService.removeWikiSubGenre(token,wikiId,subGenreId);
    }

    @CrossOrigin
    @GetMapping("/getWikiSearchTags/{token}/{wikiId}")
    public String getWikiSearchTags(@PathVariable String token, @PathVariable String wikiId){
        return wikiService.getWikiSearchTags(token, wikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiSearchTag/{token}/{wikiId}/{searchTagId}")
    public String addWikiSearchTag(@PathVariable String token, @PathVariable String wikiId,
                                   @PathVariable String searchTagId){
        return wikiService.addWikiSearchTag(token, wikiId, searchTagId);
    }

    @CrossOrigin
    @PostMapping("/removeWikiSearchTag/{token}/{wikiId}/{searchTagId}")
    public String removeWikiSearchTag(@PathVariable String token, @PathVariable String wikiId,
                                   @PathVariable String searchTagId){
        return wikiService.removeWikiSearchTag(token, wikiId, searchTagId);
    }


    @CrossOrigin
    @PostMapping("/newWiki/{tempToken}/{name}")
    public String newWiki(@PathVariable String tempToken, @PathVariable String name){
       return wikiService.newWiki(tempToken, name);
    }
    /*
    @CrossOrigin
    @PostMapping("/newWikiPage/{tempToken}/{wikiId}")
    public String newWikiPage(@PathVariable  String tempToken, @PathVariable String wikiId){
        return wikiService.newWikiPage(tempToken,wikiId);
    }
    */
    @CrossOrigin
    @PostMapping("/addWikiCategory/{tempToken}/{wikiId}/{category}")
    public String addWikiCategory(@PathVariable String tempToken, @PathVariable  String wikiId,
                             @PathVariable String category){
        return wikiService.addWikiCategory(tempToken,wikiId,category);
    }


    @CrossOrigin
    @PostMapping("/removeWikiCategory/{tempToken}/{wikiId}/{categoryId}")
    public String removeWikiCategory(@PathVariable String tempToken, @PathVariable  String wikiId,
                             @PathVariable String categoryId){
        return wikiService.removeWikiCategory(tempToken,wikiId,categoryId);
    }



    @CrossOrigin
    @GetMapping("/getWikiCategories/{tempToken}/{wikiId}")
    public String getWikiCategories(@PathVariable String tempToken, @PathVariable String wikiId){
        return wikiService.getWikiCategories(tempToken,wikiId);
    }

    @CrossOrigin
    @GetMapping("/getWikiTopCategories/{tempToken}/{wikiId}")
    public String getWikiTopCategories(@PathVariable String tempToken, @PathVariable String
                                       wikiId){
        return wikiService.getWikiTopCategories(tempToken, wikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiTopCategory/{token}/{wikiId}/{category}")
    public String addWikiTopCategory(@PathVariable String token,@PathVariable String
                                     wikiId, @PathVariable String category)
    {
        return wikiService.addWikiTopCategory(token, wikiId, category);
    }

    @CrossOrigin
    @GetMapping("/getWikiPages/{tempToken}/{wikiId}")
    public String getWikiPages(@PathVariable String tempToken, @PathVariable String wikiId){
        return  wikiService.getWikiPages(tempToken,wikiId);
    }

    @CrossOrigin
    @GetMapping("/getWikiTopPages/{token}/{wikiId}")
    public String getWikiTopPages(@PathVariable String token, @PathVariable String wikiId){
        return  wikiService.getWikiTopPages(token, wikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiPage/{token}/{wikiId}/{pageId}")
    public String addWikiPage(@PathVariable String token, @PathVariable String wikiId,
                              @PathVariable String pageId){
        return wikiService.addWikiPage(token, wikiId, pageId);
    }

    @CrossOrigin
    @PostMapping("/addWikiTopPage/{token}/{wikiId}/{pageId}")
    public String addWikiTopPage(@PathVariable String token, @PathVariable String wikiId,
                                 @PathVariable String pageId){
        return wikiService.addWikiTopPage(token, wikiId, pageId);
    }

    @CrossOrigin
    @GetMapping("/getWikiPage/{tempToken}/{wikiId}/{wikiPageId}")
    public String getWikiPage(@PathVariable String tempToken, @PathVariable String wikiId,
                              @PathVariable String wikiPageId){
        return wikiService.getWikiPage(tempToken,wikiId,wikiPageId);
    }

    /*
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

     */

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


    @CrossOrigin
    @PostMapping("/setWikiImage/{token}/{wikiId}")
    public String setWikiImage(@PathVariable String token, @PathVariable String wikiId,
                               @RequestParam("file") MultipartFile image){
        return wikiService.setWikiImg(token, wikiId, image);
    }

    @CrossOrigin
    @GetMapping(value = "/getWikiImage/{wikiId}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getProfileImage(@PathVariable String wikiId){
        return wikiService.getWikiImg(wikiId);
    }

    @CrossOrigin
    @GetMapping("/getWikiName/{wikiId}")
    public String getWikiName(@PathVariable String wikiId){
        return wikiService.getWikiName(wikiId);
    }

    @CrossOrigin
    @PostMapping("/setWikiName/{token}/{wikiId}/{wikiName}")
    public String setWikiName(@PathVariable String token, @PathVariable String wikiId,
                              @PathVariable String wikiName){
        return wikiService.setWikiName(token, wikiId, wikiName);
    }

    @CrossOrigin
    @GetMapping("/getWikiImages/{token}/{wikiId}")
    public String getWikiImages(@PathVariable String token, @PathVariable String wikiId){
        return wikiService.getWikiImages(token, wikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiImage/{token}/{wikiId}/{fileContextId}")
    public String addWikiImage(@PathVariable String token, @PathVariable String wikiId,
                               @PathVariable String fileContextId){
        return wikiService.addWikiImage(token, wikiId, fileContextId);
    }

    @CrossOrigin
    @GetMapping("/getWikiVideos/{token}/{wikiId}")
    public String getWikiVideos(@PathVariable String token, @PathVariable String wikiId){
        return wikiService.getWikiVideos(token, wikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiVideo/{token}/{wikiId}/{fileContextId}")
    public String addWikiVideo(@PathVariable String token, @PathVariable String wikiId,
                               @PathVariable String fileContextId){
        return wikiService.addWikiVideo(token, wikiId, fileContextId);
    }

}