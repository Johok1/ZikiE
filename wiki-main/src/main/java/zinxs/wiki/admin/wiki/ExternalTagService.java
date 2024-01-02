package zinxs.wiki.admin.wiki;

import jdk.jshell.spi.ExecutionControl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.WikiRepository;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;
import zinxs.wiki.wikis.wikipage.WikiPage;
import zinxs.wiki.wikis.wikipage.WikiPageRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ExternalTagService {

    private final WikiRepository wikiRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;
    private final WikiPageRepository wikiPageRepository;
    private final ExternalTagRepository externalTagRepository;




    public String getExternalTags(){
        try{


            List<ExternalTag> tags = externalTagRepository.findAll();
            String taglist = "";
            for(ExternalTag tag : tags){
                taglist += tag.getTagName() + ",";
            }
            return  taglist;

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setStatus(String tempToken, String tagname, String status){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!decodedToken.equals("josh.hooks@hotmail.com")){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
                ExternalTag tag = externalTagRepository.findByTagName(tagname).get();
                if((status.equalsIgnoreCase("active") ||
                        status.equalsIgnoreCase("deactive") ||
                        status.equalsIgnoreCase("hidden"))) {
                    tag.setStatus(status);
                    return "true";
                }else{
                    throw new RuntimeException("invalid status passed");
                }
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String getStatus(String tempToken, String tagname){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!decodedToken.equals("josh.hooks@hotmail.com")){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
                ExternalTag tag = externalTagRepository.findByTagName(tagname).get();
                return tag.getStatus();
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addTag(String tempToken, String tagname){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!decodedToken.equals("josh.hooks@hotmail.com")){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
               ExternalTag tag = new ExternalTag();
               tag.setTagName(tagname);
               externalTagRepository.save(tag);
               return "true";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String removeTag(String tempToken, String tagname){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            if(!decodedToken.equals("josh.hooks@hotmail.com")){
                throw new RuntimeException("Hey, who are you? You're not supposed to be here! " +
                        "Recording IP Address for security breach report...");
            }else{
                ExternalTag tag = externalTagRepository.findByTagName(tagname).get();
                externalTagRepository.delete(tag);
                return "true";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private Wiki getAccountWiki(String tempToken, String wikiId){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Long id = Long.valueOf(wikiId);
            if(targetAccount.isEnabled()){
                List<Wiki> wikis = wikiRepository.findByEmail(decodedToken).get();
                for(Wiki wiki : wikis) {
                    if (wiki.getId().equals(id)) {
                        return wiki;
                    }
                }
                throw new RuntimeException("None of the wikis for the account shared an ID with the wiki" +
                        " being accessed");
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccountWiki error " + e);
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
