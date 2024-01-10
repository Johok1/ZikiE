package zinxs.wiki.admin.wiki;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.admin.wiki.subgenre.SubGenre;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.WikiRepository;
import zinxs.wiki.wikis.pages.PageRepository;


import java.util.List;

@Service
@AllArgsConstructor
public class GenreService {

    private final WikiRepository wikiRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;
    private final PageRepository pageRepository;
    private final GenreRepository genreRepository;




    public String getGenres(){
        try{
            List<Genre> genres = genreRepository.findAll();
            String genreList = "";
            for(Genre genre : genres){
                genreList += genre.getGenreName() +"*" + genre.getId() + ",";
            }
            return genreList;

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getTopGenres(){
        try{
            List<Genre> genres = genreRepository.findAll();
            String genreList = "";
            for(Genre genre : genres){
                if(genre.isTopGenre()) {
                    genreList += genre.getGenreName() + "*" + genre.getId() + ",";
                }
            }
            return genreList;

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getTopSubGenres(String genreId){
        try{
            List<SubGenre> genres = genreRepository.findById(Long.valueOf(genreId)).get().getSubGenreList();
            String genreList = "";
            for(SubGenre genre : genres){
                if(genre.isTopGenre()) {
                    genreList += genre.getSubGenreName() + "*" + genre.getId() +  ",";
                }
            }
            return genreList;

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getSubGenres(String genreId){
        try{
            Genre genreResult = genreRepository.findById(Long.valueOf(genreId)).get();
            List<SubGenre> subGenres = genreResult.getSubGenreList();
            String genreList = "";
            for(SubGenre subGenre : subGenres){
                genreList += subGenre.getSubGenreName() + "*" + subGenre.getId()+ ",";
            }
            return genreList;

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setTopGenre(String tempToken, String genreId){
        try{
            if(this.isAdmin(authTokenUtils.decodeEmail(tempToken))) {
                Genre genre = genreRepository.findById(Long.valueOf(genreId)).get();
                genre.setTopGenre(true);
                return "true";
            }else{
                return "Invalid Authorization";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }



    public String addGenre(String tempToken, String genreName){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!isAdmin(decodedToken)){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
               Genre genre = new Genre();
               genre.setGenreName(genreName);
               genreRepository.save(genre);
               return "true";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeGenre(String tempToken, String genreName){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!isAdmin(decodedToken)){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
                Genre genre = genreRepository.findByGenreName(genreName).get();
                genreRepository.delete(genre);
                return "true";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getGenreName(String genreId){
        try{
            Genre genre = genreRepository.findById(Long.valueOf(genreId)).get();
            return genre.getGenreName();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private Wiki getAccountWiki(String tempToken, String wikiId){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Long id = Long.valueOf(wikiId);
            if(targetAccount.isEnabled()){
                List<Wiki> wikis = wikiRepository.findByEmail(decodedToken).get();
                for(Wiki wiki : wikis) {
                    if (wiki.getId().equals(id)) {
                        return wiki;
                    }
                }
                throw new RuntimeException("None of the wikis for the account shared an ID with the wiki" +
                        " being accessed");
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccountWiki error " + e);
        }
    }

    private Account getAccount(String tempToken){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            if(targetAccount.isEnabled()){
                return targetAccount;
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccount error " + e);
        }
    }

    private boolean isAdmin(String email){
        if(email.equals("josh.hooks@hotmail.com")
                || email.equals("zinxshosting@gmail.com")
                || email.equals("jaydencantrelle@gmail.com")){
            return true;
        }else{
            return false;
        }
    }

}
