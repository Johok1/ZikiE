package zinxs.wiki.account.wix;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "account")
@AllArgsConstructor
public class WixAccountController {
    private final WixAccountService wixAccountService;

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
