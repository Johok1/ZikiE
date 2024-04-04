package zinxs.wiki.account.wix;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;
import zinxs.wiki.wikis.pages.images.Image;


import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class WixAccountService {

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



    public String newWixAccount(String memberId){
        try{
            WixAccount account = new WixAccount(memberId);

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

    public List<ImageObjResponse> getPageImageUrls(String pageId){
        try{
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            List<ImageObjResponse> imageObjResponses = new ArrayList<>();
            for(Image image : page.getImageObjs()){
                ImageObjResponse response = new ImageObjResponse(
                        image.getFilename(), image.getData()
                );
                imageObjResponses.add(response);
            }
            return imageObjResponses;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addPageImage(String memberId, String pageId, ImageItemUrlRequest request){
        try{
            if(isPageCreator(memberId, pageId)){
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                ArrayList<Image> imageObjs = page.getImageObjs();
                Image image = new Image();
                image.setData(request.getUrl());
                image.setFilename(request.getFilename());
                imageObjs.add(image);
                page.setImageObjs(imageObjs);
                pageRepository.save(page);
                return "true";
            }else{
                throw new Exception("Invalid credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getPageImg(String pageId){
        try {
            Page page  = pageRepository.findById(Long.valueOf(pageId)).get();
            return page.getImgUrl();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setPageImg(String memberId, String pageId, ImageUrlRequest request){
        try{
            if(isPageCreator(memberId, pageId)){
                WixAccount account = getWixAccount(memberId);
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                page.setImgUrl(request.getUrl());
                pageRepository.save(page);
                ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
                account.setPages(newPageList);
                wixAccountRepository.save(account);
                return "true";
            }else{
                throw new RuntimeException("invalid credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }



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
