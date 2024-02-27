package zinxs.wiki.account.wix;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
