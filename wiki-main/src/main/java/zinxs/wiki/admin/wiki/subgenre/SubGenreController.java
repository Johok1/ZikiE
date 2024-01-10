package zinxs.wiki.admin.wiki.subgenre;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/subgenre")
@AllArgsConstructor
public class SubGenreController {
    private final SubGenreService subGenreService;

    @CrossOrigin
    @GetMapping("/getSubGenreName/{subGenreId}")
    public String getSubGenreName(@PathVariable String subGenreId){
        return subGenreService.getSubGenreName(subGenreId);
    }

    @CrossOrigin
    @GetMapping("/getSubGenreCommunityWikis/{subGenreId}")
    public String getSubGenreCommunityWikis(@PathVariable String subGenreId){
        return subGenreService.getSubGenreCommunityWikis(subGenreId);
    }

    @CrossOrigin
    @GetMapping("/getSubGenreWikis/{subGenreId}")
    public String getSubGenreWikis(@PathVariable String subGenreId){
        return subGenreService.getSubGenreWikis(subGenreId);
    }

    @CrossOrigin
    @GetMapping("/getSubGenrePages/{subGenreId}")
    public String getSubGenrePages(@PathVariable String subGenreId){
        return subGenreService.getSubGenrePages(subGenreId);
    }

    @CrossOrigin
    @PostMapping("/setTopSubGenre/{subGenreId")
    public String setTopSubGenre(@PathVariable String subGenreId){
        return subGenreService.setTopSubGenre(subGenreId);
    }

    @CrossOrigin
    @PostMapping("/addSubGenre/{token}/{subGenreName}")
    public String addSubGenre(@PathVariable String token, @PathVariable String subGenreName){
        return subGenreService.addSubGenre(token, subGenreName);
    }

    @CrossOrigin
    @PostMapping("/removeSubGenre/{token}/{subGenreId}")
    public String removeSubGenre(@PathVariable String token, @PathVariable String subGenreId){
        return subGenreService.removeSubGenre(token, subGenreId);
    }

    @CrossOrigin
    @PostMapping("/addCommunityWikiToSubGenre/{subGenreId}/{communityWikiId}")
    public String addCommunityWikiToSubGenre(@PathVariable String subGenreId, @PathVariable String communityWikiId){
        return subGenreService.addCommunityWikiToSubGenre(subGenreId, communityWikiId);
    }

    @CrossOrigin
    @PostMapping("/addWikiToSubGenre/{subGenreId}/{wikiId}")
    public String addWikiToSubGenre(@PathVariable String subGenreId, @PathVariable String wikiId){
        return subGenreService.addCommunityWikiToSubGenre(subGenreId, wikiId);
    }

    @CrossOrigin
    @PostMapping("/addPageToSubGenre/{subGenreId}/{pageId}")
    public String addPageToSubGenre(@PathVariable String subGenreId, @PathVariable String pageId){
        return subGenreService.addCommunityWikiToSubGenre(subGenreId, pageId);
    }


}
