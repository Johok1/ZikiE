package zinxs.wiki.wikis.searchtags;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.pages.PageRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class SearchTagService {

    private final SearchTagRepository searchTagRepository;

    private final AccountRepository accountRepository;

    private final AuthTokenUtils authTokenUtils;

    public String getAllSearchTags(){
        try{
            List<SearchTag> tags = searchTagRepository.findAll();
            String tagList = "";
            for(SearchTag tag : tags){
                tagList += tag.getId() + "*" + tag.getName();
            }
            return  tagList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String newSearchTag(String token, String name){
        try{
            if(getAccount(token).isEnabled()){
                SearchTag searchTag = new SearchTag(name);
                searchTagRepository.save(searchTag);
                return String.valueOf(searchTag.getId());
            }else{
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeSearchTag(String token, String searchTagId){
        try{
            if(getAccount(token).isEnabled()){
                SearchTag searchTag = searchTagRepository.findById(Long.valueOf(searchTagId)).get();
                searchTagRepository.delete(searchTag);
                return "true";
            }else {
                throw new RuntimeException("Invalid Credentials");
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private Account getAccount(String tempToken){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            if(targetAccount.isEnabled()){
                return targetAccount;
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccount error " + e);
        }
    }

}
