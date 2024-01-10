package zinxs.wiki.wikis;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;


import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class WikiService {

    private final WikiRepository wikiRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;

    private final PageRepository pageRepository;


    public String hasAccess(String token, String wikiId){
        try{
                Account account = getAccount(token);
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                if(wiki.getEmail().equals(account.getEmail())){
                    return "true";
                }else if(wiki.getEditAccessAccounts().contains(account.getUsername())){
                    return "true";
                }else{
                    return "false";
                }

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String getWikis(){
        try{
            List<Wiki> wikis = wikiRepository.findAll();
            String wikiList = "";
            for(Wiki wiki: wikis){
                wikiList += wiki.getId() + ",";
            }
            return wikiList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String newWiki(String tempToken){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = new Wiki();
            wiki.setEmail(account.getEmail());
            wikiRepository.save(wiki);
            return wiki.getId() + "";
        }catch (Exception e){
            throw new RuntimeException("error in new Wiki: " + e);
        }
    }


    public String newWikiPage(String tempToken, String wikiId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = getAccountWiki(tempToken, wikiId);
            Page page = new Page();
            page.setEmail(wiki.getEmail());
            wiki.getPages().add(page);
            pageRepository.save(page);
            wikiRepository.save(wiki);
            return String.valueOf(page.getId());
        }catch (Exception e){
            throw new RuntimeException("error in new wiki page: " + e);
        }
    }

    public String addWikiTag(String tempToken, String wikiId, String tag){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = getAccountWiki(tempToken, wikiId);
            wiki.getInternalTags().add(tag);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in add wiki tag: " + e);
        }
    }

    public String removeWikiPageTag(String tempToken, String wikiId, String wikiPageId, String tag){
        try{
            Account account = getAccount(tempToken);

            Page wikiPage = getWikiPage(wikiId,wikiPageId);
            wikiPage.getInternalTags().remove(tag);
            pageRepository.save(wikiPage);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiPageTag(String tempToken, String wikiId, String wikiPageId, String tag){
        try{
            Account account = getAccount(tempToken);
            Page wikiPage = getWikiPage(wikiId,wikiPageId);
            wikiPage.getInternalTags().add(tag);
            pageRepository.save(wikiPage);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getWikiPageTags(String tempToken, String wikiId, String wikiPageId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            Page wikiPage = getWikiPage(wikiId,wikiPageId);
            String tags = "";
            for(String tag : wikiPage.getInternalTags()){
                tags += tag+",";
            }
            return tags;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getWikiTags(String tempToken, String wikiId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            String tags = "";
            for(String tag : wiki.getInternalTags()){
                tags += tag + ",";
            }
            return tags;
        }catch (Exception e){
            throw new RuntimeException("error in get wiki tags: " + e);
        }
    }

    public String getWikiGenres(String tempToken, String wikiId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            String tags = "";
            for(String tag: wiki.getGenres()){
                tags += tag+",";
            }
            return tags;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiGenre(String tempToken, String wikiId, String tag){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> Genres = wiki.getGenres();
            Genres.add(tag);
            wiki.setGenres(Genres);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeWikiGenre(String tempToken, String wikiId, String tag){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> Genres = wiki.getGenres();
            Genres.remove(tag);
            wiki.setGenres(Genres);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getWikiPagesOfTag(String tempToken, String wikiId, String tag){
        try{
            return "";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getWikiPages(String tempToken, String wikiId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            String wikiPageIds = "";
            for(Page page : wiki.getPages()) {
                wikiPageIds += page.getId()+ ",";
            }
            return wikiPageIds;
        }catch (Exception e){
            throw new RuntimeException("error in get wiki pagess " + e);
        }
    }

    public String getWikiPage(String tempToken, String wikiId, String wikiPageId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            for(Page page: wiki.getPages()){
                if(page.getId().equals(Long.valueOf(wikiPageId))){
                    return page.getPageContent();
                }
            }
            throw new RuntimeException("no wiki page matching id");
        }catch (Exception e){
            throw new RuntimeException("error in get wiki page: " + e);
        }
    }

    private Page getWikiPage(String wikiId, String wikiPageId){
        try{
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            for(Page wikiPage : wiki.getPages()){
                if(wikiPage.getId().equals(Long.valueOf(wikiPageId))){
                    return wikiPage;
                }
            }
            throw new RuntimeException("No wiki page associated with id");
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


    public String setBanUser(String token, String wikiId, String username) {
        try{
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> bannedAccounts = wiki.getBannedAccounts();
            bannedAccounts.add(username);
            wiki.setBannedAccounts(bannedAccounts);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setBanUser " + e);
        }
    }

    public String setEditPerm(String token, String wikiId, String username) {
        try{
            Wiki wiki = getAccountWiki(token, wikiId);
            ArrayList<String> editAccessAccounts = wiki.getEditAccessAccounts();
            editAccessAccounts.add(username);
            wiki.setEditAccessAccounts(editAccessAccounts);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setEditPerm " + e);
        }
    }

    public String removeEditPerm(String token, String wikiId, String username){
        try{
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> editAccessAccounts = wiki.getEditAccessAccounts();
            editAccessAccounts.remove(username);
            wiki.setEditAccessAccounts(editAccessAccounts);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setEditPerm " + e);
        }
    }

    public String removeBanUser(String token, String wikiId, String username){
        try{
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> bannedAccounts = wiki.getBannedAccounts();
            bannedAccounts.remove(username);
            wiki.setBannedAccounts(bannedAccounts);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setBanUser " + e);
        }
    }

    public String checkUserBanned(String token, String wikiId, String username){
        try{
            Account user = getAccount(token);

            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> bannedUsers = wiki.getBannedAccounts();
            String banned = String.valueOf(bannedUsers.contains(username));
            return banned;
        }catch (Exception e){
            throw new RuntimeException("error in checkUserBanned " + e);
        }
    }

    public String checkUserEditPerms(String token, String wikiId, String username){
        try{
            Account user = getAccount(token);

            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> editUsers = wiki.getEditAccessAccounts();
            String editAccess = String.valueOf(editUsers.contains(username));
            return editAccess;
        }catch (Exception e){
            throw new RuntimeException("error in checkUserEditPerms " + e);
        }
    }

    public String setWikiPageContent(String tempToken,String wikiId, String wikiPageIdStr,  String pageContent){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            Long wikiPageId = Long.valueOf(wikiPageIdStr);
            if(targetAccount.isEnabled()){
                List<Page> wikiPages = wiki.getPages();
                for(Page wikiPage : wikiPages) {
                    if (wikiPage.getId().equals(wikiPageId)) {
                        wikiPage.setPageContent(pageContent);
                        pageRepository.save(wikiPage);
                        return "true";
                    }
                }
                throw new RuntimeException("None of the pages for the account shared an ID with the page" +
                        " being accessed");
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("savePage error " + e);
        }
    }



}