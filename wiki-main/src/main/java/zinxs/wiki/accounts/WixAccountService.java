package zinxs.wiki.accounts;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import zinxs.wiki.reactobjects.AccountPageHeaderResponse;

import zinxs.wiki.pages.Page;
import zinxs.wiki.pages.PageRepository;
import zinxs.wiki.images.Image;
import zinxs.wiki.reactobjects.*;


import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class WixAccountService implements WixAccountServiceInterface {

    @Autowired
    private  WixAccountRepository wixAccountRepository;
    @Autowired
    private  PageRepository pageRepository;


    public void setWixAccountRepository(WixAccountRepository repository){
        this.wixAccountRepository = repository;
    }

    public void setPageRepository(PageRepository repository){
        this.pageRepository = repository;
    }

    //Test/admin endpoint
    @Override
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

    @Override
    public String newWixAccount(String memberId){
        try{
            WixAccount account = new WixAccount(memberId);

            wixAccountRepository.save(account);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<AccountPageHeaderResponse> getAccountPageHeaders(String wixId){
        try{
            WixAccount account = getWixAccount(wixId);
            List<AccountPageHeaderResponse> pageHeaders = new ArrayList<>();
            List<Page> pages = account.getPages();
            for(Page page: pages){
                AccountPageHeaderResponse response = new AccountPageHeaderResponse(
                        String.valueOf(page.getId()),
                        page.getName(),
                        page.getImgUrl()
                );
                pageHeaders.add(response);
            }
            return pageHeaders;
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
