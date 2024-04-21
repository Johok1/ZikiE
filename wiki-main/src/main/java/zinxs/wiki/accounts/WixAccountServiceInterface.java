package zinxs.wiki.accounts;

import zinxs.wiki.reactobjects.AccountPageHeaderResponse;

import java.util.List;

public interface WixAccountServiceInterface {

    List<String> getWixAccounts(String pincode);

    String newWixAccount(String wixId);

    List<AccountPageHeaderResponse> getAccountPageHeaders(String wixId);

}
