package zinxs.wiki.pages;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zinxs.wiki.accounts.WixAccount;
import zinxs.wiki.accounts.WixAccountRepository;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class PageService implements PageServiceInterface{

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private WixAccountRepository wixAccountRepository;

    @Override
    public String newAccountPage(String wixId, String pageName){
        try{
            Page page = new Page();
            WixAccount account = getWixAccount(wixId);
            page.setCreator(account);
            page.setName(pageName);
            ArrayList<Page> pages = account.getPages();
            pages.add(page);
            account.setPages(pages);
            wixAccountRepository.save(account);
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
                WixAccount account = getWixAccount(memberId);
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                page.setName(pageName);
                pageRepository.save(page);
                ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
                account.setPages(newPageList);
                wixAccountRepository.save(account);
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
            WixAccount account = getWixAccount(wixId);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            if(account.getId().equals(page.getCreator().getId())) {
                page.setPageContent(content);
                pageRepository.save(page);
                ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
                account.setPages(newPageList);
                wixAccountRepository.save(account);
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
            WixAccount account = getWixAccount(wixId);
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
            WixAccount account = getWixAccount(memberId);
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

    private WixAccount getWixAccount(String wixId){
        try{
            return wixAccountRepository.findByWixCode(wixId).get();
        }catch (Exception e){
            throw new RuntimeException(e);
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
