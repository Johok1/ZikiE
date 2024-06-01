package zinxs.wiki.imagesapi;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRepository;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;
import zinxs.wiki.pagesapi.Page;
import zinxs.wiki.pagesapi.PageRepository;
import zinxs.wiki.jsonobjects.ImageItemUrlRequest;
import zinxs.wiki.jsonobjects.ImageObjResponse;
import zinxs.wiki.jsonobjects.ImageUrlRequest;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ImageService implements  ImageServiceInterface{

    //Isn't it interesting how the imageservice class has a
    // dependency on every single repository but the image repository

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PageRepository pageRepository;

    @Override
    public List<ImageObjResponse> getPageImageUrls(String pageId){
        try{
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            List<ImageObjResponse> imageObjResponses = new ArrayList<>();
            for(Image image : page.getImageObjs()){
                ImageObjResponse response = new ImageObjResponse(
                        image.getFilename(), image.getFile()
                );
                imageObjResponses.add(response);
            }
            return imageObjResponses;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String addPageImage(String memberId, String pageId, ImageItemUrlRequest request){
        try{
            if(isPageCreator(memberId, pageId)){
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                ArrayList<Image> imageObjs = page.getImageObjs();
                Image image = new Image();
                image.setFile(request.getFile());
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

    @Override
    public byte[] getPageImg(String pageId){
        try {
            Page page  = pageRepository.findById(Long.valueOf(pageId)).get();
            return page.getImgData();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String setPageImg(String token, String pageId, MultipartFile request){
        try{
            if(isPageCreator(token, pageId)){
                Account account = getAccount(token);
                Page page = pageRepository.findById(Long.valueOf(pageId)).get();
                page.setImgData(request.getBytes());
                pageRepository.save(page);
                ArrayList<Page> newPageList = replacePageInList(account.getPages(), pageId, page);
                account.setPages(newPageList);
                accountRepository.save(account);
                return "true";
            }else{
                throw new RuntimeException("invalid credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }



    private boolean isPageCreator(String token, String pageId){
        try{
            Account account = getAccount(token);
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
            Account targetAccount = (Account) accountRepository.findByEmail(decodedToken).get();
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
