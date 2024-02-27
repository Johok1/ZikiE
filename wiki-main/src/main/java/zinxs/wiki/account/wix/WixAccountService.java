package zinxs.wiki.account.wix;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
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
            WixAccount account = new WixAccount();
            account.setWixId(memberId);
            wixAccountRepository.save(account);
            return "true";
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

            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private WixAccount getWixAccount(String wixId){
        try{
            return wixAccountRepository.findByWixId(wixId).get();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
