package zinxs.wiki.admin.wiki.subgenre;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.admin.wiki.Genre;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.WikiRepository;
import zinxs.wiki.wikis.community.CommunityWiki;
import zinxs.wiki.wikis.community.CommunityWikiRepository;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;

import java.util.ArrayList;


@Service
@AllArgsConstructor
public class SubGenreService{

    private final SubGenreRepository subGenreRepository;

    private final AuthTokenUtils authTokenUtils;

    private final WikiRepository wikiRepository;
    private final CommunityWikiRepository communityWikiRepository;
    private final PageRepository pageRepository;


    public String getSubGenreName(String subGenreId){
        try{
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            return subGenre.getSubGenreName();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getSubGenreCommunityWikis(String subGenreId){
        try{
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            ArrayList<CommunityWiki> communityWikis = subGenre.getCommunityWikiList();
            String wikiList = "";
            for(CommunityWiki wiki : communityWikis){
                wikiList += wiki.getName() +"*"+wiki.getId()+ ",";
            }
            return wikiList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String getSubGenreWikis(String subGenreId){
        try{
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            ArrayList<Wiki> wikis = subGenre.getWikiList();
            String wikiList = "";
            for(Wiki wiki : wikis){
                wikiList += wiki.getName()+"*"+wiki.getId() + ",";
            }
            return wikiList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String getSubGenrePages(String subGenreId){
        try{
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            ArrayList<Page> pages = subGenre.getPageList();
            String pageList = "";
            for(Page page : pages){
                pageList += page.getName() +"*"+page.getId()+ ",";
            }
            return pageList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setTopSubGenre(String subGenreId){
        try{
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            subGenre.setTopGenre(true);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addSubGenre(String tempToken, String genreName){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!isAdmin(decodedToken)){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
                SubGenre genre = new SubGenre();
                genre.setSubGenreName(genreName);
                subGenreRepository.save(genre);
                return "true";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeSubGenre(String tempToken, String subGenreId){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!isAdmin(decodedToken)){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
                SubGenre genre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
                subGenreRepository.delete(genre);
                return "true";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addCommunityWikiToSubGenre(String subGenreId, String communityWikiId){
        try{
            CommunityWiki wiki = communityWikiRepository.findById(Long.valueOf(communityWikiId)).get();
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            ArrayList<CommunityWiki> wikiList = subGenre.getCommunityWikiList();
            wikiList.add(wiki);
            subGenre.setCommunityWikiList(wikiList);
            subGenreRepository.save(subGenre);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiToSubGenre(String subGenreId, String wikiId){
        try{
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
            ArrayList<Wiki> wikiList = subGenre.getWikiList();
            wikiList.add(wiki);
            subGenre.setWikiList(wikiList);
            subGenreRepository.save(subGenre);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addPageToSubGenre(String subGenreId, String pageId){
        Page page = pageRepository.findById(Long.valueOf(pageId)).get();
        SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
        ArrayList<Page> pageList = subGenre.getPageList();
        pageList.add(page);
        subGenre.setPageList(pageList);
        subGenreRepository.save(subGenre);
        return "true";
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
