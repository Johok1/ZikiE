package zinxs.wiki.account.wix;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.account.Account;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;
import zinxs.wiki.wikis.pages.PageService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class WixAccountService {

    private final WixAccountRepository wixAccountRepository;

    private final PageRepository pageRepository;

    private final PageService pageService;


    public String newWixAccount(String memberId){
        try{
            WixAccount account = new WixAccount(memberId);

            wixAccountRepository.save(account);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public List<String> getWixAccounts(String pincode){
        try{
            if(pincode.equals("BUST")){
                List<String> accounts = new ArrayList<>();
                List<WixAccount> wixAccounts = wixAccountRepository.findAll();
                for(WixAccount wixAccount : wixAccounts){
                    accounts.add(wixAccount.getWixCode());
                }
                return accounts;
            }else{
                throw new Exception("wrong pincode");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }



    public List<AccountPageHeaderResponse> getAccountPageHeaders(String wixId){
        try{
            WixAccount account = getWixAccount(wixId);
            List<AccountPageHeaderResponse> pageHeaders = new ArrayList<>();
            List<Page> pages = account.getPages();
            for(Page page: pages){
                AccountPageHeaderResponse response = new AccountPageHeaderResponse(
                        String.valueOf(page.getId()),
                        page.getName()
                );
                pageHeaders.add(response);
            }
            return pageHeaders;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

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

    public String getPageName(String pageId){
        try{
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            return page.getName();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }



    public String setPageName(String memberId, String pageId, String pageName){
        try{
            if(isPageCreator(memberId, pageId)){
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                page.setName(pageName);
                pageRepository.save(page);
                return "true";
            }else{
                throw new RuntimeException("Invalid credentials for operation setPageName");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public byte[] getPageImg(String pageId){
        try {
            Page page  = pageRepository.findById(Long.valueOf(pageId)).get();
            return page.getImg();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setPageImg(String memberId, String pageId, MultipartFile image){
        try{
            if(isPageCreator(memberId, pageId)){
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                page.setImg(image.getBytes());
                pageRepository.save(page);
                return "true";
            }else{
                throw new RuntimeException("invalid credentials");
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

    public String postAccountPageContent(String wixId, String pageId, String content) {
        try{
            WixAccount account = getWixAccount(wixId);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            page.setPageContent(content);
            pageRepository.save(page);
            ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
            account.setPages(newPageList);
            wixAccountRepository.save(account);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public ArrayList<Page> replacePageInList(ArrayList<Page> pages, String replaceId, Page replaceWith){
        for(int x = 0; x<pages.size(); x++){
            if(pages.get(x).getId().equals(replaceId)){
                pages.set(x,replaceWith);
            }
        }
        return pages;
    }
}
