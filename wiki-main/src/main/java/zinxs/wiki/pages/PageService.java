package zinxs.wiki.pages;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zinxs.wiki.accounts.Account;
import zinxs.wiki.accounts.AccountRepository;
import zinxs.wiki.accounts.utilities.AuthTokenUtils;


import java.util.ArrayList;

@Service
@AllArgsConstructor
public class PageService implements PageServiceInterface{

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @Override
    public String newAccountPage(String token, String pageName){
        try{
            Page page = new Page();
            Account account = getAccount(token);
            page.setCreator(account);
            page.setName(pageName);
            ArrayList<Page> pages = account.getPages();
            pages.add(page);
            account.setPages(pages);
            accountRepository.save(account);
            pageRepository.save(page);

            return String.valueOf(page.getId());
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getPageName(String pageId){
        try{
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            return page.getName();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String setPageName(String memberId, String pageId, String pageName){
        try{
            if(isPageCreator(memberId, pageId)){
                Account account = getAccount(memberId);
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                page.setName(pageName);
                pageRepository.save(page);
                ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
                account.setPages(newPageList);
                accountRepository.save(account);
                return "true";
            }else{
                throw new RuntimeException("Invalid credentials for operation setPageName");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String postAccountPageContent(String wixId, String pageId, String content) {
        try{
            Account account = getAccount(wixId);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            if(account.getId().equals(page.getCreator().getId())) {
                page.setPageContent(content);
                pageRepository.save(page);
                ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
                account.setPages(newPageList);
                accountRepository.save(account);
                return "true";
            }else {
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getPageContent(String wixId, String pageId){
        try{
            Account account = getAccount(wixId);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            if(page.getCreator().getId().equals(account.getId())) {
                return page.getPageContent();
            }else {
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    private boolean isPageCreator(String memberId, String pageId){
        try{
            Account account = getAccount(memberId);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            if(page.getCreator().getId().equals(account.getId())) {
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private Account getAccount(String token){
        try{
            String decodedToken = authTokenUtils.decodeEmail(token);
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

    private ArrayList<Page> replacePageInList(ArrayList<Page> pages, String replaceId, Page replaceWith){
        for(int x = 0; x<pages.size(); x++){
            if(pages.get(x).getId().equals(Long.valueOf(replaceId))){
                pages.set(x,replaceWith);
            }
        }
        return pages;
    }
}
