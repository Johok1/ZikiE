package zinxs.wiki.account.wix;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "account")
@AllArgsConstructor
public class WixAccountController {
    private final WixAccountService wixAccountService;

    @CrossOrigin
    @GetMapping("getPageName/{pageId}")
    public String getPageName(@PathVariable String pageId){
        return wixAccountService.getPageName(pageId);
    }

    @CrossOrigin
    @GetMapping("getPageImage/{pageId}")
    public String getPageImage(@PathVariable String pageId){
        return wixAccountService.getPageImg(pageId);
    }

    @CrossOrigin
    @PostMapping("postPageName/{memberId}/{pageId}/{pageName}")
    public String postPageName(@PathVariable String memberId, @PathVariable String pageId,
                               @PathVariable String pageName){
        return wixAccountService.setPageName(memberId, pageId, pageName);
    }

    @CrossOrigin
    @PostMapping("postPageImage/{memberId}/{pageId}")
    public String postPageImage(@PathVariable String memberId, @PathVariable String pageId,
                                @RequestBody ImageUrlRequest request){
        return wixAccountService.setPageImg(memberId, pageId, request.getUrl());
    }

    @CrossOrigin
    @PostMapping("postNewAccount/{wixMemberId}")
    public String postNewAccount(@PathVariable String wixMemberId){
        return wixAccountService.newWixAccount(wixMemberId);
    }

    @CrossOrigin
    @GetMapping("getWixAccountsAdmin/{pincode}")
    public List<String> getWixAccountsAdmin(@PathVariable String pincode){
        return wixAccountService.getWixAccounts(pincode);
    }

    @CrossOrigin
    @PostMapping("postNewAccountPage/{wixId}/{pageName}")
    public String postNewAccountPage(@PathVariable String wixId, @PathVariable String pageName){
        return wixAccountService.newAccountPage(wixId, pageName);
    }

    @CrossOrigin
    @PostMapping("postAccountPageContent/{wixId}/{pageId}")
    public String postAccountPageContent(@PathVariable String wixId, @PathVariable String pageId, @RequestBody String content){
        return wixAccountService.postAccountPageContent(wixId, pageId, content);
    }


}
