package zinxs.wiki.wikis.pages;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.utilities.AuthTokenUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PageService {

    private final PageRepository pageRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;



    public String newPage(String tempToken, String name){
        try {
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            if(targetAccount.isEnabled()) {
                Page page = new Page();
                page.setName(name);
                page.setEmail(decodedToken);
                pageRepository.save(page);
                return String.valueOf(page.getId());
            }else{
                throw new Exception("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("newPage error + " + e);
        }
    }

    public String savePage(String tempToken, String pageId,  String pageContent){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Long id = Long.valueOf(pageId);
            if(targetAccount.isEnabled()){
                List<Page> pages = pageRepository.findByEmail(decodedToken).get();
                for(Page page : pages) {
                    if (page.getId().equals(id)) {
                        page.setPageContent(pageContent);
                        pageRepository.save(page);
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

    public String newInternalTag(String token, String pageId, String tagName) {
        try{
            Account targetAccount = getAccount(token);
            Page targetPage = getAccountPage(token,pageId);
            targetPage.getInternalTags().add(tagName);
            pageRepository.save(targetPage);
            return "true";
        }catch(Exception e){
            throw new RuntimeException("newInternalTag error " + e);
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

    public String getPage(String token, String pageId) {
        try{
            Page page = getAccountPage(token, pageId);
            return page.getPageContent();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    private Page getAccountPage(String tempToken, String pageId){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Long id = Long.valueOf(pageId);
            if(targetAccount.isEnabled()){
                List<Page> pages = pageRepository.findByEmail(decodedToken).get();
                for(Page page : pages) {
                    if (page.getId().equals(id)) {
                        return page;
                    }
                }
                throw new RuntimeException("None of the pages for the account shared an ID with the page" +
                        " being accessed");
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccountPage error " + e);
        }
    }

    public String setBanUser(String token, String pageId, String username) {
        try{
            Page page = getAccountPage(token, pageId);
            ArrayList<String> bannedAccounts = page.getBannedAccounts();
            bannedAccounts.add(username);
            page.setBannedAccounts(bannedAccounts);
            pageRepository.save(page);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setBanUser " + e);
        }
    }

    public String setEditPerm(String token, String pageId, String username) {
        try{
            Page page = getAccountPage(token, pageId);
            ArrayList<String> editAccessAccounts = page.getEditAccessAccounts();
            editAccessAccounts.add(username);
            page.setEditAccessAccounts(editAccessAccounts);
            pageRepository.save(page);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setEditPerm " + e);
        }
    }

    public String removeEditPerm(String token, String pageId, String username){
        try{
            Page page = getAccountPage(token, pageId);
            ArrayList<String> editAccessAccounts = page.getEditAccessAccounts();
            editAccessAccounts.remove(username);
            page.setEditAccessAccounts(editAccessAccounts);
            pageRepository.save(page);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setEditPerm " + e);
        }
    }

    public String removeBanUser(String token, String pageId, String username){
        try{
            Page page = getAccountPage(token, pageId);
            ArrayList<String> bannedAccounts = page.getBannedAccounts();
            bannedAccounts.remove(username);
            page.setBannedAccounts(bannedAccounts);
            pageRepository.save(page);
            return "true";
        }catch (Exception e){
            throw new RuntimeException("error in setBanUser " + e);
        }
    }

    public String dumpUsers(String token){
        try{
            Account user = getAccount(token);

            List<Account> accounts = accountRepository.findAll();
            String accountList = "";
            for(Account account : accounts){
                accountList += account.getUsername() + ",";
            }
            return accountList;
        }catch (Exception e){
            throw new RuntimeException("error in dumpusers " + e);
        }
    }

    public String dumpPages(){
        try{

            List<Page> pages = pageRepository.findAll();
            String pageList = "";
            for(Page page : pages){
                pageList += String.valueOf(page.getId()) + ",";
            }
            return pageList;
        }catch (Exception e){
            throw new RuntimeException("error in dumppages " + e);
        }
    }

    public String dumpPageTags(String token, String pageId){
        try{
            Account user = getAccount(token);

            Page page = getAccountPage(token, pageId);
            ArrayList<String> tags = page.getInternalTags();
            String tagList = "";
            for(String tag : tags){
                tagList += tag + ",";
            }
            return tagList;
        }catch(Exception e){
            throw new RuntimeException("error in dumppagetags " + e);
        }
    }

    public String checkUserBanned(String token, String pageId, String username){
        try{
            Account user = getAccount(token);

            Page page = getAccountPage(token, pageId);
            ArrayList<String> bannedUsers = page.getBannedAccounts();
            String banned = String.valueOf(bannedUsers.contains(username));
            return banned;
        }catch (Exception e){
            throw new RuntimeException("error in checkUserBanned " + e);
        }
    }

    public String checkUserEditPerms(String token, String pageId, String username){
        try{
            Account user = getAccount(token);

            Page page = getAccountPage(token, pageId);
            ArrayList<String> editUsers = page.getEditAccessAccounts();
            String editAccess = String.valueOf(editUsers.contains(username));
            return editAccess;
        }catch (Exception e){
            throw new RuntimeException("error in checkUserEditPerms " + e);
        }
    }


}
