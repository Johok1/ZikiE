package zinxs.wiki.wikis.files.categories;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.WikiRepository;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class CategoryService {


    private final PageRepository pageRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    private final WikiRepository wikiRepository;



    public String getCategoryPages(String categoryId){
        try{
            Category category = categoryRepository.findById(Long.valueOf(categoryId)).get();
            ArrayList<Page> pageList = category.getPageList();
            String strPageList = "";
            for(Page page : pageList){
                strPageList += page.getId() + "*" + page.getName() + ",";
            }
            return strPageList;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String addCategoryPage(String categoryId, String pageId){
        try{
            Category category = categoryRepository.findById(Long.valueOf(categoryId)).get();
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            category.getPageList().add(page);
            categoryRepository.save(category);
            return "true";
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    public String getCategoryName(String categoryId){
        try{
            Category category = categoryRepository.findById(Long.valueOf(categoryId)).get();
            return category.getName();
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

    private boolean hasAccessBool(String token, String wikiId){
        try{
            Account account = getAccount(token);
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            if(wiki.getWikiCreator().getId().equals(account.getId())){
                return true;
            }else if(wiki.getEditAccessAccounts().contains(account)){
                return true;
            }else{
                return false;
            }

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
