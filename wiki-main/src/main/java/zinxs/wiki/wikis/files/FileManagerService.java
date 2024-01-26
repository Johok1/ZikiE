package zinxs.wiki.wikis.files;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.wikis.Wiki;
import zinxs.wiki.wikis.WikiRepository;
import zinxs.wiki.wikis.files.dao.FileContextResponse;
import zinxs.wiki.wikis.pages.Page;
import zinxs.wiki.wikis.pages.PageRepository;

@Service
@AllArgsConstructor
public class FileManagerService {


    private final Path imgRoot = Paths.get("uploads");

    private final Path vidRoot = Paths.get("uploads");

    private final FileContextRepository fileContextRepository;

    private final PageRepository pageRepository;
    private final AuthTokenUtils authTokenUtils;
    private final AccountRepository accountRepository;

    private final WikiRepository wikiRepository;



    public void init() {
        try {
            Files.createDirectories(this.imgRoot);
            Files.createDirectories(this.vidRoot);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }


    public String saveImage(String token, String pageId, String wikiId, MultipartFile file) {
        try {
            Account account = this.getAccount(token);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            FileContext fileContext = new FileContext();
            fileContext.setAuthor(account);
            fileContext.setParentPage(page);
            fileContext.setFilename(file.getOriginalFilename());

            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            page.getImageContext().add(fileContext.getId() +"");
            wiki.getImageNames().add(fileContext.getId() +"");
            pageRepository.save(page);
            wikiRepository.save(wiki);
            Files.copy(file.getInputStream(), this.imgRoot.resolve(file.getOriginalFilename()));
            fileContextRepository.save(fileContext);
            return fileContext.getId() +"";
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    public String saveVideo(String token, String pageId, String wikiId, MultipartFile file) {
        try {
            Account account = this.getAccount(token);
            Page page = pageRepository.findById(Long.valueOf(pageId)).get();
            FileContext fileContext = new FileContext();
            fileContext.setAuthor(account);
            fileContext.setParentPage(page);
            fileContext.setFilename(file.getOriginalFilename());

            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            page.getVideoContext().add(fileContext.getId() +"");
            wiki.getVideoNames().add(fileContext.getId() + "");
            pageRepository.save(page);
            wikiRepository.save(wiki);
            Files.copy(file.getInputStream(), this.vidRoot.resolve(file.getOriginalFilename()));
            fileContextRepository.save(fileContext);
            return fileContext.getId() +"";
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    public FileContextResponse getFileContext(String fileContextId){
        try{
            FileContext context = fileContextRepository.findById(Long.valueOf(fileContextId)).get();
            FileContextResponse response = new FileContextResponse(context.getAuthor().getUsername(),
                    context.getParentPage().getId()+"",context.getAuthor().getProfileImage());
            return response;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public Resource getImage(String fileContextId) {
        try {
            FileContext context = fileContextRepository.findById(Long.valueOf(fileContextId)).get();
            String filename = context.getFilename();
            Path file = imgRoot.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }


    public Resource getVideo(String fileContextId) {
        try {
            FileContext context = fileContextRepository.findById(Long.valueOf(fileContextId)).get();
            String filename = context.getFilename();
            Path file = vidRoot.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public String deleteFile(String wikiId, String fileContextId){
        try{
            FileContext context = fileContextRepository.findById(Long.valueOf(fileContextId)).get();
            String filename = context.getFilename();
            Files.deleteIfExists(vidRoot.resolve(filename));
            Files.deleteIfExists(imgRoot.resolve(filename));
            Page page = context.getParentPage();
            page.getImageContext().remove(context.getId());
            page.getVideoContext().remove(context.getId());
            Wiki wiki = wikiRepository.findById(Long.valueOf(wikiId)).get();
            wiki.getImageNames().remove(context.getId());
            wiki.getVideoNames().remove((context.getId()));
            pageRepository.save(page);
            wikiRepository.save(wiki);
            return "true";
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


    private Page getAccountPage(String tempToken, String pageId){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            Long id = Long.valueOf(pageId);
            if(targetAccount.isEnabled()){
                Page page = pageRepository.findById(id).get();
                return page;

            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccountPage error " + e);
        }
    }



}
