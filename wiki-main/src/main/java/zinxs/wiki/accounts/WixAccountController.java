package zinxs.wiki.accounts;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zinxs.wiki.reactobjects.AccountPageHeaderResponse;
import zinxs.wiki.reactobjects.ImageItemUrlRequest;
import zinxs.wiki.reactobjects.ImageObjResponse;
import zinxs.wiki.reactobjects.ImageUrlRequest;

import java.util.List;

@RestController
@RequestMapping(path = "account")
@AllArgsConstructor
public class WixAccountController {
    private final WixAccountService wixAccountService;


    @CrossOrigin
    @GetMapping("getAccountPageHeaders/{wixId}")
    public List<AccountPageHeaderResponse> getAccountPageHeaders(@PathVariable String wixId){
        return wixAccountService.getAccountPageHeaders(wixId);
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
















}
