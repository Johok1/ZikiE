package zinxs.wiki.admin.wiki;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/genre")
@AllArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @CrossOrigin
    @GetMapping("/getGenres")
    public String getGenres(){
        return genreService.getGenres();
    }

    @CrossOrigin
    @GetMapping("/getTopGenres")
    public String getTopGenres(){
        return genreService.getTopGenres();
    }

    @CrossOrigin
    @GetMapping("/getSubGenres/{genreId}")
    public String getSubGenres(@PathVariable String genreId){
        return genreService.getSubGenres(genreId);
    }

    @CrossOrigin
    @GetMapping("/getTopSubGenres/{genreId}")
    public String getTopSubGenres(@PathVariable String genreId){
        return genreService.getTopSubGenres(genreId);
    }

    @CrossOrigin
    @PostMapping("/addGenre/{token}/{genre}")
    public String addGenre(@PathVariable String token, @PathVariable String genre){
        return genreService.addGenre(token,genre);
    }

    @CrossOrigin
    @PostMapping("/removeGenre/{token}/{genre}")
    public String removeGenre(@PathVariable String token, @PathVariable String genre){
        return genreService.removeGenre(token,genre);
    }

    @CrossOrigin
    @PostMapping("/setTopGenre/{token}/{genreId}")
    public String setTopGenre(@PathVariable String token, @PathVariable String genreId){
        return genreService.setTopGenre(token,genreId);
    }

    @CrossOrigin
    @GetMapping("/getGenreName/{genreId}")
    public String getGenreName(@PathVariable String genreId){
        return genreService.getGenreName(genreId);
    }

    @CrossOrigin
    @GetMapping("/addGenreSubGenre/{genreId}/{subGenreName}")
    public String addGenreSubGenre(@PathVariable String genreId, @PathVariable String subGenreName){
        return genreService.addGenreSubGenre(genreId, subGenreName);
    }

    @CrossOrigin
    @GetMapping("/getAllSubGenres")
    public String getAllSubGenres(){
        return genreService.getAllSubGenres();
    }

    @CrossOrigin
    @GetMapping("/getAllCommunityWikis")
    public String getAllCommunityWikis(){
        return genreService.getAllCommunityWikis();
    }

    @CrossOrigin
    @GetMapping("/getAllWikis")
    public String getAllWikis(){
        return genreService.getAllWikis();
    }

    @CrossOrigin
    @GetMapping("/getAllPages")
    public String getAllPages(){
        return genreService.getAllPages();
    }

    @CrossOrigin
    @GetMapping("/getGenreCommunityWikis/{genreId}")
    public String getGenreCommunityWikis(@PathVariable String genreId){
        return genreService.getGenreCommunityWikis(genreId);
    }

    @CrossOrigin
    @GetMapping("/getGenreWikis/{genreId}")
    public String getGenreWikis(@PathVariable String genreId){
        return genreService.getGenreWikis(genreId);
    }

    @CrossOrigin
    @GetMapping("/getGenrePages")
    public String getGenrePages(@PathVariable String genreId){
        return genreService.getGenrePages(genreId);
    }
}
