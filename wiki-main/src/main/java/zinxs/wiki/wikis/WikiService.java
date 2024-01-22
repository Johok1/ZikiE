package zinxs.wiki.wikis;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.admin.wiki.subgenre.SubGenre;
import zinxs.wiki.admin.wiki.subgenre.SubGenreRepository;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;
import zinxs.wiki.wikis.searchtags.SearchTag;
import zinxs.wiki.wikis.searchtags.SearchTagRepository;


import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class WikiService {

    private final WikiRepository wikiRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;

    private final SubGenreRepository subGenreRepository;

    private final PageRepository pageRepository;

    private final SearchTagRepository searchTagRepository;


    public String hasAccess(String token, String wikiId){
        try{
                Account account = getAccount(token);
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                if(wiki.getWikiCreator().getId().equals(account.getId())){
                    return "true";
                }else if(wiki.getEditAccessAccounts().contains(account)){
                    return "true";
                }else{
                    return "false";
                }

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    private boolean hasAccessBool(String token, String wikiId){
        try{
            Account account = getAccount(token);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            if(wiki.getWikiCreator().getId().equals(account.getId())){
                return true;
            }else if(wiki.getEditAccessAccounts().contains(account)){
                return true;
            }else{
                return false;
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

    public String newWiki(String tempToken, String name ){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = new Wiki();
            wiki.setName(name);
            wiki.setWikiCreator(account);
            wikiRepository.save(wiki);
            return wiki.getId() + "";
        }catch (Exception e){
            throw new RuntimeException("error in new Wiki: " + e);
        }
    }

/* have to convert pages to holding account object instead of email string
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
*/
    public String addWikiCategory(String tempToken, String wikiId, String category){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = getAccountWiki(tempToken, wikiId);
            wiki.getCategories().add(category);
            wikiRepository.save(wiki);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in add wiki tag: " + e);
        }
    }



    public String getWikiCategories(String tempToken, String wikiId){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            String categories = "";
            for(String category : wiki.getCategories()){
                categories += category + ",";
            }
            return categories;
        }catch (Exception e){
            throw new RuntimeException("error in get wiki tags: " + e);
        }
    }


    public String removeWikiCategory(String tempToken, String wikiId, String category){
        try{
            Account account = getAccount(tempToken);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            ArrayList<String> categories = wiki.getCategories();
            for(String categoryStr : categories){
                if(categoryStr.equalsIgnoreCase(category)){
                    categories.remove(categoryStr);
                }
            }
            wiki.setCategories(categories);
            wikiRepository.save(wiki);
            return "true";
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
                List<Wiki> wikis = wikiRepository.findByWikiCreator(targetAccount).get();
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

/* have to change endpoint to pass temp token rather than username
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

 */
/* have to change endpoint to pass temp token rather than username
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

 */
/* have to change endpoint to pass temp token rather than username
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

 */
/* have to change endpoint to pass temp token rather than username
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
*/

/* have to change endpont to pass temp token rather than username
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
*/
    /* have to change endpoint to pass temp token rather than username
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
*/
    public String setWikiPageContent(String tempToken,String wikiId, String wikiPageIdStr,  String pageContent){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            Long wikiPageId = Long.valueOf(wikiPageIdStr);
            if(targetAccount.isEnabled()){
                ArrayList<Page> wikiPages = wiki.getPages();
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

    public String getWikiName(String wikiId){
        try{
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            return wiki.getName();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setWikiName(String token, String wikiId, String wikiName){
        try{
            String email = authTokenUtils.decodeEmail(token);
            if(this.isAdmin(email)) {
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                wiki.setName(wikiName);
                wikiRepository.save(wiki);
                return "true";
            }else {
                return "Credentials Invalid for Operation";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public byte[] getWikiImg(String wikiId){
        try {
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            return wiki.getImg();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setWikiImg(String token, String wikiId, MultipartFile image){
        try{
            String email = authTokenUtils.decodeEmail(token);
            if(this.isAdmin(email)) {
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                wiki.setImg(image.getBytes());
                wikiRepository.save(wiki);
                return "true";
            }else {
                return "Credentials Invalid for Operation";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
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

    public String getWikiSubGenres(String token, String wikiId) {
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<SubGenre> subGenres = wiki.getSubGenres();
                String subGenresStr = "";
                for(SubGenre subGenre : subGenres){
                    subGenresStr += subGenre.getId() + "*"+subGenre.getSubGenreName() +",";
                }
                return subGenresStr;
            }else{
                throw new RuntimeException("Invalid Credentials");
            }

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiSubGenre(String token, String wikiId, String subGenreId) {
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
                ArrayList<SubGenre> subGenres = wiki.getSubGenres();
                subGenres.add(subGenre);
                wiki.setSubGenres(subGenres);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeWikiSubGenre(String token, String wikiId, String subGenreId) {
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                SubGenre subGenre = subGenreRepository.findById(Long.valueOf(subGenreId)).get();
                ArrayList<SubGenre> subGenres = wiki.getSubGenres();
                subGenres.remove(subGenre);
                wiki.setSubGenres(subGenres);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    public String getWikiSearchTags(String token, String wikiId) {
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<SearchTag> searchTags = wiki.getSearchTags();
                String searchTagsStr = "";
                for(SearchTag searchTag : searchTags){
                    searchTagsStr += searchTag.getId() + "*"+searchTag.getName() +",";
                }
                return searchTagsStr;
            }else{
                throw new RuntimeException("Invalid Credentials");
            }

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiSearchTag(String token, String wikiId, String searchTagId) {
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                SearchTag searchTag = searchTagRepository.findById(Long.valueOf(searchTagId)).get();
                ArrayList<SearchTag> searchTags = wiki.getSearchTags();
                searchTags.add(searchTag);
                wiki.setSearchTags(searchTags);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeWikiSearchTag(String token, String wikiId, String searchTagId) {
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                SearchTag searchTag = searchTagRepository.findById(Long.valueOf(searchTagId)).get();
                ArrayList<SearchTag> searchTags = wiki.getSearchTags();
                searchTags.remove(searchTag);
                wiki.setSearchTags(searchTags);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getWikiImages(String token, String wikiId){
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<String> wikiImages = wiki.getImageNames();
                String imageNames = "";
                for(String wikiImg : wikiImages){
                    imageNames += wikiImg + ",";
                }
                return imageNames;
            }else{
                throw new RuntimeException("invalid access credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiImage(String token, String wikiId, String filename){
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<String> wikiImages = wiki.getImageNames();
                wikiImages.add(filename);
                wiki.setImageNames(wikiImages);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("invalid access credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String removeWikiImage(String token, String wikiId, String filename){
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<String> wikiImages = wiki.getImageNames();
                wikiImages.remove(filename);
                wiki.setImageNames(wikiImages);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("invalid access credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getWikiVideos(String token, String wikiId){
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<String> wikiVideos = wiki.getVideoNames();
                String videoNames = "";
                for(String wikiVid : wikiVideos){
                    videoNames += wikiVid + ",";
                }
                return videoNames;
            }else{
                throw new RuntimeException("invalid access credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addWikiVideo(String token, String wikiId, String filename){
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<String> wikiVideos = wiki.getVideoNames();
                wikiVideos.add(filename);
                wiki.setVideoNames(wikiVideos);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("invalid access credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String removeWikiVideo(String token, String wikiId, String filename){
        try{
            if(hasAccessBool(token, wikiId)){
                Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
                ArrayList<String> wikiVideos = wiki.getVideoNames();
                wikiVideos.remove(filename);
                wiki.setVideoNames(wikiVideos);
                wikiRepository.save(wiki);
                return "true";
            }else{
                throw new RuntimeException("invalid access credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}